import {
    findAllNonAnsweredMessage,
    findInitiatorNonAnsweredMessage,
    findMessageById,
    saveCompanionMessage
} from "../../persistence/message.mjs";
import {getSessionAttribute, setSessionAttribute} from "../session/index.mjs";
import {forwardMessageToInitiator, sendMessageToCompanion} from "../messages/sendAndForwardMessage.mjs";
import {initiatorListMenu} from "../menu/initiatorListMenu.mjs";

export const replyMessageHandler = async (ctx) => {
    const currentReply = await getSessionAttribute(ctx, "current_reply")

    // найти сообщение инициатора
    const initiatorsMessage = await findMessageById(currentReply.message_id)
    // запсать сообщение компаньона
    await saveCompanionMessage(ctx.msg, initiatorsMessage.initiator_user_id, initiatorsMessage.message_id)
    // отослать инициатору
    await forwardMessageToInitiator(ctx, ctx.msg, initiatorsMessage.chat_id)

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

        await sendMessageToCompanion(ctx, message)

    } else {
        await setSessionAttribute(ctx, {current_reply: null})

        const nonAnsweredMessages = await findAllNonAnsweredMessage(ctx.user)

        const messageInfoText = nonAnsweredMessages.length ?
            'У вас есть еще сообщения.' :
            'Вы ответили на все сообщения.'

        // TODO если в сессии не установлена настройка присылать сообщения по появлению
        // TODO записать id сообщения, если появятся новые сообщения, обновлять количество сообщений
        await ctx.reply(messageInfoText, {
            reply_markup: initiatorListMenu
        })
    }
}
