import {findInitiatorNonAnsweredMessage, findAllNonAnsweredMessage} from "../../persistence/message.mjs"
import {setSessionAttribute} from "../session/index.mjs";
import {sendMessageToCompanion} from "../messages/sendAndForwardMessage.mjs";

// Отправить первое сообщение, остальные обрабатывать в после реплая
export const startSendMessage = async ({ companionCtx, initiator, }) => {
    const message = initiator ?
        await findInitiatorNonAnsweredMessage(companionCtx.user, initiator.user_id) :
        await findAllNonAnsweredMessage(companionCtx.user)

    if (message) {
        await setSessionAttribute(companionCtx, {
            current_reply: {
                message_id: message.message_id,
                initiator_id: initiator?.user_id,
                // reply_mode: replyMode
            }
        })

        await sendMessageToCompanion(companionCtx, message)
    }
}
