import {findInitiatorNonAnsweredMessage} from "../../../../messages/reply/persistence.mjs"
import {setSessionAttribute} from "../../../../common/session/index.mjs"
import {forwardMessageToCompanion} from "../../../../messages/reply/forwardMessageToCompanion.mjs"
import {findAllNonAnsweredMessage} from "../../../../common/persistence/index.mjs"

// Отправить первое сообщение, остальные обрабатывать в после реплая
export const startSendMessage = async ({ companionCtx, initiator, }) => {
    const message = initiator ?
        await findInitiatorNonAnsweredMessage(companionCtx.user, initiator.id) :
        await findAllNonAnsweredMessage(companionCtx.user)

    if (message) {
        const messageType = companionCtx.user_message_types.find(tpe => tpe.id === message.need_reply_message_type_id)

        const botMsg = await forwardMessageToCompanion(companionCtx, message, messageType)

        await setSessionAttribute(companionCtx, {
            current_reply: {
                message_id: message.message_id,
                initiator_id: initiator?.id,
                bot_message_id: botMsg.message_id
            }
        })
    }
}
