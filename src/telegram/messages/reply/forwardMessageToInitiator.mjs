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
    const username = ctx.user.nickname || ctx.user.username
    await ctx.api.sendMessage(chatId, `Сообщение от ${username} :`)
}
