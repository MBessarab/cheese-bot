import {getSessionAttribute, setSessionAttribute} from "../common/session/index.mjs"
import {initiatorListMenu} from "../menu/initiator/initiatorListMenu/index.mjs"
import {
    findInitiatorNonAnsweredMessage,
    findMessageById,
    findTypeMessageByShort,
    saveCompanionMessage
} from "./persistence.mjs"
import {forwardMessageToInitiator} from "./forwardMessageToInitiator.mjs"
import {forwardMessageToCompanion} from "./forwardMessageToCompanion.mjs"

export async function replyMessageHandler(ctx){
    const currentReply = await getSessionAttribute(ctx, "current_reply")

    // проверить реплай на конкретное сообщение
    if(currentReply.bot_message_id !== ctx.msg.reply_to_message.message_id) {
        return await ctx.reply("Свайпните другое сообщение для ответа")
    }

    // найти сообщение инициатора
    const initiatorsMessage = await findMessageById(currentReply.message_id)

    // проверка на уже отвеченное сообщение
    if (!initiatorsMessage)
        return await ctx.reply("Вы уже ответили на это сообщение", {
            reply_markup: initiatorListMenu
        })

    // проверить тип сообщения
    const messageTypeShort = getMessageType(ctx.msg)
    const messageType = findTypeMessageByShort(messageTypeShort)
    if(messageType.id !== initiatorsMessage.need_reply_message_type_id)
        return await ctx.reply("Вы вбрали неверный формат ответа")

    // записать сообщение компаньона
    await saveCompanionMessage(ctx.msg, initiatorsMessage.initiator_user_id, initiatorsMessage.message_id)
    // отослать инициатору
    await forwardMessageToInitiator(ctx, ctx.msg, initiatorsMessage.chat_id)

    const message = currentReply.initiator_id ?
        await findInitiatorNonAnsweredMessage(ctx.user, initiatorsMessage.initiator_user_id) :
        await findAllNonAnsweredMessage(ctx.user)

    // прислать новое сообщение или уведомление, что сообщений пока нет
    if (message) {
        const botMsg = await forwardMessageToCompanion(ctx, message, messageType)

        // записать новое сообщение в сессию на ответ
        await setSessionAttribute(ctx, {
            current_reply: {
                message_id: message.message_id,
                initiator_id: currentReply.initiator_id,
                bot_message_id: botMsg.message_id
            }
        })
    } else {
        await setSessionAttribute(ctx, {current_reply: null})

        const nonAnsweredMessages = await findAllNonAnsweredMessages(ctx.user)

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

function getMessageType(message) {
    return (message.text && "text") ||
        (message.voice && "voice") ||
        (message.video_note && "video_note")
}
