import {findUsersById} from "../../persistence/user.mjs";

// Переслать сообщение инициатору
export async function forwardMessageToInitiator(ctx, message, chatId) {
    message && (
        (message.text && await forwardText(ctx, chatId, message.text)) ||
        (message.voice?.file_id && await forwardVoice(ctx, chatId, message.voice.file_id)) ||
        (message.video_note?.file_id && await forwardVideoNote(ctx, chatId, message.video_note.file_id))
    )
}

async function forwardText(ctx, chatId, text) {
    await sendInitiatorFromMessage(ctx, chatId)
    await ctx.api.sendMessage(chatId, text)
}

async function forwardVoice(ctx, chatId, voiceFileId) {
    await sendInitiatorFromMessage(ctx, chatId)
    await ctx.api.sendVoice(chatId, voiceFileId)
}

async function forwardVideoNote(ctx, chatId, videoNodeFileId) {
    await sendInitiatorFromMessage(ctx, chatId)
    await ctx.api.sendVideoNote(chatId, videoNodeFileId)
}

async function sendInitiatorFromMessage(ctx, chatId) {
    const username = ctx.user.custom_username || ctx.user.username
    await ctx.api.sendMessage(chatId, `Сообщение от ${username} :`)
}

// Отправить сообщение компаньону
export async function sendMessageToCompanion(ctx, message) {
    message && (
        (message.text && await sendTextToInitiator(ctx, message)) ||
        (message.voice_file_id && await sendVoiceToInitiator(ctx, message)) ||
        (message.video_note_file_id && await sendVideoNoteToInitiator(ctx, message))
    )
}

async function sendTextToInitiator(ctx, message) {
    await sendFromMessageToInitiator(ctx, message)
    await ctx.reply(message.text)
}

async function sendVoiceToInitiator(ctx, message) {
    await sendFromMessageToInitiator(ctx, message)
    await ctx.replyWithVoice(message.voice_file_id)
}

async function sendVideoNoteToInitiator(ctx, message) {
    await sendFromMessageToInitiator(ctx, message)
    await ctx.replyWithVideoNote(message.video_note_file_id)
}

async function sendFromMessageToInitiator(ctx, message) {
    const initiator = await findUsersById(message.initiator_user_id)
    const username = initiator.custom_username || initiator.username
    await ctx.reply(`Сообщение от ${username} :`)
}
