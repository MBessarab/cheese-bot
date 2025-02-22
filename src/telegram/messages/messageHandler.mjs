import {getSessionAttribute} from "../session/index.mjs"
import {writeMessageHandler} from "../common/writeMessageHandler.mjs"
import {replyMessageHandler} from "../common/replyMessageHandler.mjs"
import {replyErrorMessage} from "./replyErrorMessage.mjs"
import {mainMenu} from "../menu/mainMenu.mjs"

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
        default:
            await ctx.reply("Выберете действие и повторите сообщение", {
                reply_markup: mainMenu
            })
    }

    return next()
}
