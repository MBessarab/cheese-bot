import {Menu} from "@grammyjs/menu"
import {backBtnMsg, helloMsg} from "../constants.mjs"
import {countNonAnsweredMessages} from "../../persistence/message.mjs"
import {findUsersByIds} from "../../persistence/user.mjs"
import {startSendMessages} from "../handlers/sendMessages.mjs";


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
                .text(
                    `${usernameMsg} ${countNonAnsweredMsg}`,
                    async (ctx, next) => {

                        return await next()
                    }
                )
                .row()
        })

        const countAllMessages = countMessages.reduce((acc, item) => acc + parseInt(item.count), 0)

        countAllMessages && range.text(
            `Прислать все (${countAllMessages})`,
            async (ctx, next) => {
                await startSendMessages(ctx)
                return await next()
            }
        )

        return range
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })

