import {Menu} from "@grammyjs/menu"
import {getSessionAttribute, setSessionAttribute} from "../../../../../../../common/session/index.mjs"
import {backBtnMsg} from "../../../../../../../common/constants.mjs"
import {messageTypesProfileMenu} from "../../index.mjs"

export const changePriceMessageTypeMiddleware = async (ctx) => {
    await setSessionAttribute(ctx, { chat_mode: 'change_price_message_type' })

    const messageTypeId = await getSessionAttribute(ctx, 'profile_message_type_id')
    const messageType = ctx.user_message_types.find(t => t.id === messageTypeId)

    await ctx.editMessageText(`Введите стоимость для типа ответа ${messageType.ru_title}`)
}

async function backMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: null })

    const messageTypesText = ctx.user_message_types.map(messageType => {
        const enabledMessageType = messageType.active ? `Вкл.` : `Выкл`

        return `\n${messageType.emoji} - ${messageType.ru_title} \n ┝ Статус: ${enabledMessageType} \n ┕ Стоимость сообщения: ${messageType.price_stars} \n`
    }).join('')

    const messageText = `Настройка типов ответов: \n${messageTypesText}`
    await ctx.editMessageText(messageText, {
        reply_markup: messageTypesProfileMenu
    })
}

export const changePriceMessageTypeMenu = new Menu('change_price_message_type')
    .text(backBtnMsg, backMiddleware)
