import {getSessionAttribute, setSessionAttribute} from "../common/session/index.mjs"
import {writeMessageHandler} from "./write/index.mjs"
import {replyMessageHandler} from "./reply/index.mjs"
import {mainMenu} from "../menu/main_menu/index.mjs"
import {changePriceMessageTypeHandler} from "./change_price_message_type/index.mjs"
import {changeNickname} from "./change_profile_nickname/index.mjs"
import {changeProfileDescription} from "./change_profile_description/index.mjs";

export const messageHandler = async (ctx) => {
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
            await changeProfileDescription(ctx)

            await setSessionAttribute(ctx, { chat_mode: null })
            break
        case "change_price_message_type":
            if(!isNaN(parseInt(ctx.msg.text))) {
                await changePriceMessageTypeHandler(ctx)

                await setSessionAttribute(ctx, { chat_mode: null })
            } else {
                await ctx.reply("Введите целое число")
            }
            break
        case "change_profile_nickname":
            await changeNickname(ctx)

            await setSessionAttribute(ctx, { chat_mode: null })
            break
        default:
            await ctx.reply("Выберете действие и повторите сообщение", {
                reply_markup: mainMenu
            })
    }
}

async function replyErrorMessage(ctx) {
    return await ctx.reply("Ответьте на конкретное сообщение")
}
