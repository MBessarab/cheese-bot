import {
    findAllNonAnsweredMessage,
    findInitiatorNonAnsweredMessage,
    findMessageById,
    saveCompanionMessage
} from "../../persistence/message.mjs";
import {getSessionAttribute, setSessionAttribute} from "../session/index.mjs";
import {forwardMessage, sendMessage} from "./sendMessages.mjs";

export const replyMessageHandler = async (ctx) => {
    const currentReply = await getSessionAttribute(ctx, "current_reply")

    // найти сообщение
    const initiatorsMessage = await findMessageById(currentReply.message_id)
    // запсать сообщение в базу
    await saveCompanionMessage(ctx.msg, initiatorsMessage.initiator_user_id, initiatorsMessage.message_id)
    // отослать инициатору
    await forwardMessage(ctx, ctx.msg, initiatorsMessage.chat_id)

    const message = currentReply.initiator_id ?
        await findInitiatorNonAnsweredMessage(ctx.user, initiator) :
        await findAllNonAnsweredMessage(ctx.user)

    // прислать новое сообщение или уведомление, что сообщений пока нет
    if (message) {
        // записать новое сообщение в сессию на ответ
        await setSessionAttribute(ctx, {
            current_reply: {
                message_id: message.message_id,
                initiator_id: currentReply.initiator_id
            }
        })

        await sendMessage(ctx, message)

    } else {
        await setSessionAttribute(ctx, {current_reply: null})
        await ctx.reply("Сообщений больше нет")
    }
}
