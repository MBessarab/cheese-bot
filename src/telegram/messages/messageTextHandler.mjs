import {writeMessageHandler} from "../common/writeMessageHandler.mjs"
import {replyMessageHandler} from "../common/replyMessageHandler.mjs"

export const messageTextHandler = async (ctx, next) => {
    const session = await ctx.session

    switch (session.chat_mode) {
        case "write":
            await writeMessageHandler(ctx)
            break
        case "reply":
            await replyMessageHandler(ctx)
            break
        default:
            console.log("default")
    }
    return next()
}
