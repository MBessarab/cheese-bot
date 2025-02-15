import {findNonAnsweredMessage} from "../../persistence/message.mjs";

// Отправить первое сообщение, остальные обрабатывать в после реплая
export const startSendMessages = async (companionCtx) => {
    const message = await findNonAnsweredMessage(companionCtx.user)
    message && await sendMessage(companionCtx, message[0])
}

export const sendMessage = async (ctx, message) => {
    message && (
        (message.text && await ctx.reply(message.text)) ||
        (message.voice_file_id && await ctx.replyWithVoice(message.voice_file_id)) ||
        (message.video_note_file_id && await ctx.replyWithVideoNote(message.video_note_file_id))
    )
}

// grouped = [[initiator_user_id, [...messages]]]
function groupedUsersWithMessages(messages) {
    return messages.reduce((acc, msg) => {
        // Проверяем, существует ли группа для текущего id
        let group = acc.find(item => item[0] === msg.initiator_user_id)

        if (!group) {
            // Если группа не существует, создаем ее
            group = [msg.initiator_user_id, []]
            acc.push(group)
        }
        // Добавляем текущий элемент в соответствующую группу
        group[1].push(msg)

        return acc
    }, [])
}