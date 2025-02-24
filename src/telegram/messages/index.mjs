import {getSessionAttribute, setSessionAttribute} from "../common/session/index.mjs"
import {writeMessageHandler} from "./writeMessageHandler.mjs"
import {replyMessageHandler} from "./replyMessageHandler.mjs"
import {mainMenu} from "../menu/mainMenu/index.mjs"
import {changePriceMessageTypeHandler} from "./changeCostMessageType.mjs"
import {changeNickname} from "./changeNickname.mjs"

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
            await ctx.reply("Изменение профиля пока недодступно")

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
