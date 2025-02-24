import {getSessionAttribute} from "../common/session/index.mjs"
import {writeMessageHandler} from "./writeMessageHandler.mjs"
import {replyMessageHandler} from "./replyMessageHandler.mjs"
import {mainMenu} from "../menu/mainMenu/index.mjs"

export const messageHandler = async (ctx, next) => {
    const chatMode = await getSessionAttribute(ctx, "chat_mode")

    switch (chatMode) {
        case "write":
            await writeMessageHandler(ctx)
            break
        case "reply":
            ctx.msg.reply_to_message ?
                await replyMessageHandler(ctx) :
                await replyErrorMessage(ctx)
            break
        case "change_profile_description":
            ctx.msg.reply_to_message ?
                await replyMessageHandler(ctx) :
                await replyErrorMessage(ctx)
            break
        default:
            await ctx.reply("Выберете действие и повторите сообщение", {
                reply_markup: mainMenu
            })
    }

    return next()
}

async function replyErrorMessage(ctx) {
    return await ctx.reply("Ответьте на конкретное сообщение")
}
