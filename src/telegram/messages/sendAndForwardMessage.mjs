import {findUsersById} from "../../persistence/user.mjs"

// Переслать сообщение инициатору
export async function forwardMessageToInitiator(ctx, message, chatId) {
    message && (
        (message.text && await forwardTextToInitiator(ctx, chatId, message.text)) ||
        (message.voice?.file_id && await forwardVoiceToInitiator(ctx, chatId, message.voice.file_id)) ||
        (message.video_note?.file_id && await forwardVideoNoteToInitiator(ctx, chatId, message.video_note.file_id))
    )
}

async function forwardTextToInitiator(ctx, chatId, text) {
    await sendFromMessageToInitiator(ctx, chatId)
    await ctx.api.sendMessage(chatId, text)
}

async function forwardVoiceToInitiator(ctx, chatId, voiceFileId) {
    await sendFromMessageToInitiator(ctx, chatId)
    await ctx.api.sendVoice(chatId, voiceFileId)
}

async function forwardVideoNoteToInitiator(ctx, chatId, videoNodeFileId) {
    await sendFromMessageToInitiator(ctx, chatId)
    await ctx.api.sendVideoNote(chatId, videoNodeFileId)
}

async function sendFromMessageToInitiator(ctx, chatId) {
    const username = ctx.user.custom_username || ctx.user.username
    await ctx.api.sendMessage(chatId, `Сообщение от ${username} :`)
}

// Отправить сообщение компаньону
export async function sendMessageToCompanion(ctx, message, messageType) {
    message && (
        (message.text && await sendTextToCompanion(ctx, message, messageType)) ||
        (message.voice_file_id && await sendVoiceToCompanion(ctx, message, messageType)) ||
        (message.video_note_file_id && await sendVideoNoteToCompanion(ctx, message, messageType))
    )
}

async function sendTextToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    await ctx.reply(message.text)
}

async function sendVoiceToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    await ctx.replyWithVoice(message.voice_file_id)
}

async function sendVideoNoteToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    await ctx.replyWithVideoNote(message.video_note_file_id)
}

async function sendFromMessageToCompanion(ctx, message, messageType) {
    const initiator = await findUsersById(message.initiator_user_id)
    const username = initiator.custom_username || initiator.username

    await ctx.reply(
        `${messageType.price_stars} ⭐️ \n\nСообщение от <b>${username}</b> \n\nСпособ ответа - ${messageType.emoji} ${messageType.ru_title}`,
        { parse_mode: 'HTML' }
    )
}
