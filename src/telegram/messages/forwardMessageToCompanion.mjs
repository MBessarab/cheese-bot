import {findUsersById} from "./persistence.mjs"

// Отправить сообщение компаньону
export async function forwardMessageToCompanion(ctx, message, messageType) {
    return message && (
        (message.text && await sendTextToCompanion(ctx, message, messageType)) ||
        (message.voice_file_id && await sendVoiceToCompanion(ctx, message, messageType)) ||
        (message.video_note_file_id && await sendVideoNoteToCompanion(ctx, message, messageType))
    )
}

async function sendTextToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    return await ctx.reply(message.text)
}

async function sendVoiceToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    return await ctx.replyWithVoice(message.voice_file_id)
}

async function sendVideoNoteToCompanion(ctx, message, messageType) {
    await sendFromMessageToCompanion(ctx, message, messageType)
    return await ctx.replyWithVideoNote(message.video_note_file_id)
}

async function sendFromMessageToCompanion(ctx, message, messageType) {
    const initiator = await findUsersById(message.initiator_user_id)
    const username = initiator.nickname || initiator.username

    await ctx.reply(
        `${messageType.price_stars} ⭐️ \n\nСообщение от <b>${username}</b> \n\nСпособ ответа - ${messageType.emoji} ${messageType.ru_title}`,
        { parse_mode: 'HTML' }
    )
}
