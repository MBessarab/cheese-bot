import {findInitiatorNonAnsweredMessage, findAllNonAnsweredMessage} from "../../persistence/message.mjs"
import {setSessionAttribute} from "../session/index.mjs";

// Отправить первое сообщение, остальные обрабатывать в после реплая
export const startSendMessage = async ({ companionCtx, initiator, /*replyMode*/ }) => {
    const message = initiator ?
        await findInitiatorNonAnsweredMessage(companionCtx.user, initiator) :
        await findAllNonAnsweredMessage(companionCtx.user)

    if (message) {
        await setSessionAttribute(companionCtx, {
            current_reply: {
                message_id: message.message_id,
                initiator_id: initiator?.user_id,
                // reply_mode: replyMode
            }
        })

        await sendMessage(companionCtx, message)
    }
}

export const sendMessage = async (ctx, message) => {
    message && (
        (message.text && await ctx.reply(message.text)) ||
        (message.voice_file_id && await ctx.replyWithVoice(message.voice_file_id)) ||
        (message.video_note_file_id && await ctx.replyWithVideoNote(message.video_note_file_id))
    )
}

export const forwardMessage = async (ctx, message, chatId) => {
    message && (
        (message.text && await forwardText(ctx, chatId, message.text)) ||
        (message.voice?.file_id && await forwardVoice(ctx, chatId, message.voice.file_id)) ||
        (message.video_note?.file_id && await forwardVideoNote(ctx, chatId, message.video_note.file_id))
    )
}

async function forwardVoice(ctx, chatId, voiceFileId) {
    await sendFromMessage(ctx, chatId)
    await ctx.api.sendVoice(chatId, voiceFileId)
}

async function forwardVideoNote(ctx, chatId, videoNodeFileId) {
    await sendFromMessage(ctx, chatId)
    await ctx.api.sendVideoNote(chatId, videoNodeFileId)
}

async function forwardText(ctx, chatId, text) {
    await sendFromMessage(ctx, chatId)
    await ctx.api.sendMessage(chatId, text)
}

async function sendFromMessage(ctx, chatId) {
    const username = ctx.user.custom_username || ctx.user.username
    await ctx.api.sendMessage(chatId, `Сообщение от ${username} :`)
}