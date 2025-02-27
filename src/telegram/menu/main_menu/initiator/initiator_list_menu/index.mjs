import {Menu} from "@grammyjs/menu"
import {backBtnMsg, helloMsg} from "../../../../common/constants.mjs"
import {setSessionAttribute} from "../../../../common/session/index.mjs"
import {startSendMessage} from "./startSendMessage.mjs"
import {countNonAnsweredMessages} from "../../../../persistence/messages.mjs";
import {findUsersByIds} from "../../../../persistence/users.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function initiatorListSubmenuMiddleware(ctx) {
    // проверить, есть ли новые сообщения
    const countMessages = await countNonAnsweredMessages(ctx.user)
    ctx.countMessages = countMessages

    const text = countMessages.length ? 'У вас есть новые сообщения 🙋🏻‍♂️' : 'У вас нет новых сообщений'

    await ctx.editMessageText(text)
}

const sendUserMessagesMiddleware = (initiator) => {
    return async (ctx) => {
        await setSessionAttribute(ctx, { chat_mode: "reply" })

        await startSendMessage({ companionCtx: ctx, initiator })
    }
}

const sendAllMessagesMiddleware = async (ctx) => {
    await setSessionAttribute(ctx, { chat_mode: "reply" })

    await startSendMessage({ companionCtx: ctx, /*replyMode: "all"*/ })
}

const backMiddleware = async (ctx) => {
    await setSessionAttribute(ctx, { chat_mode: null })

    await ctx.editMessageText(helloMsg)
}

//////////////////////////////// Menu ///////////////////////////////

export const initiatorListMenu = new Menu("initiator_list_menu")
    .dynamic( async (ctx, range) => {
        const countMessages = await ctx.countMessages || await countNonAnsweredMessages(ctx.user)

        const initiatorIds = countMessages.map((item) => item.initiator_user_id)
        const initiators = await findUsersByIds(initiatorIds)

        initiators.forEach((initiator) => {
            const countNonAnswered = countMessages
                .find(countMessages => countMessages.initiator_user_id === initiator.id).count

            const countNonAnsweredMsg =  countNonAnswered ? `(${countNonAnswered})` : ''
            const usernameMsg = initiator.nickname || initiator.username

            range
                .text(`${usernameMsg} ${countNonAnsweredMsg}`, sendUserMessagesMiddleware(initiator))
                .row()
        })

        const countAllMessages = countMessages.reduce((acc, item) => acc + parseInt(item.count), 0)

        countAllMessages && range.text(`Прислать все (${countAllMessages})`, sendAllMessagesMiddleware)

        return range
    })
    .row()
    .back(backBtnMsg, backMiddleware)

