import {Menu} from "@grammyjs/menu"
import {getSessionAttribute, setSessionAttribute} from "../../../../../../common/session/index.mjs"
import {backBtnMsg} from "../../../../../../common/constants.mjs"

export const changePriceMessageTypeMiddleware = async (ctx) => {
    const messageType = await getSessionAttribute(ctx, 'profile_message_type')
    await setSessionAttribute(ctx, { chat_mode: 'change_price_message_type' })
    await ctx.editMessageText(`Введите стоимость для типа ответа ${messageType.ru_title}`)
}

async function backMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: null })
}

export const changePriceMessageTypeMenu = new Menu('change_price_message_type')
    .back(backBtnMsg, backMiddleware)