import {writeMessageHandler} from "../common/writeMessageHandler.mjs"
import {replyMessageHandler} from "../common/replyMessageHandler.mjs"
import {replyErrorMessage} from "./replyErrorMessage.mjs"
import {getSessionAttribute} from "../session/index.mjs"


export const messageTextHandler = async (ctx, next) => {
    const chatMode = await getSessionAttribute(ctx, "chat_mode")

    switch (chatMode) {
        case "write":
            await writeMessageHandler(ctx)
            break
        case "reply":
            ctx.msg.reply_to_message ? await replyMessageHandler(ctx) : await replyErrorMessage(ctx)
            break
        default:
            console.warn(`Chat mode is not defined: ${chatMode}`)
    }
    return next()
}
