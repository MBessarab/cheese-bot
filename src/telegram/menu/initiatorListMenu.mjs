import {Menu} from "@grammyjs/menu"
import {backBtnMsg, helloMsg} from "../constants.mjs"
import {countNonAnsweredMessages} from "../../persistence/message.mjs"
import {findUsersByIds} from "../../persistence/user.mjs"
import {startSendMessages} from "../common/sendMessages.mjs"

///////////////////////////// Middleware /////////////////////////////

export const initiatorListSubmenuMiddleware = async (ctx, next) => {
    await ctx.editMessageText("Выбрать, кому ответить:")
    return await next()
}

const sendUserMessagesMiddleware = (initiator) => {
    return async (ctx, next) => {
        const session = await ctx.session
        session.chat_mode = "reply"

        await startSendMessages(ctx, initiator)

        return await next()
    }
}

const sendAllMessagesMiddleware = async (ctx, next) => {
    await startSendMessages(ctx)
    return await next()
}

const backMiddleware = async (ctx) => {
    await ctx.editMessageText(helloMsg)
}

//////////////////////////////// Menu ///////////////////////////////

export const initiatorListMenu = new Menu("initiator_list_menu")
    .dynamic( async (ctx, range) => {
        const countMessages = await countNonAnsweredMessages(ctx.user)
        const initiatorIds = countMessages.map((item) => item.initiator_user_id)
        const initiators = await findUsersByIds(initiatorIds)

        initiators.forEach((initiator) => {
            const countNonAnswered = countMessages
                .find(countMessages => countMessages.initiator_user_id === initiator.user_id).count

            const countNonAnsweredMsg =  countNonAnswered ? `(${countNonAnswered})` : ''
            const usernameMsg = initiator.custom_username || initiator.username

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

