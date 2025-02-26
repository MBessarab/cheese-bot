import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../../common/constants.mjs"
import {changeActiveUserMessageType, getMessageTypeById} from "./persistence.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../../../../../common/session/index.mjs"
import {changePriceMessageTypeMenu, changePriceMessageTypeMiddleware} from "./change_price_message_type_menu/index.mjs"
import {messageTypesProfileMenu} from "../index.mjs"
import {findUserMessageTypes} from "../../../../../../common/persistence/index.mjs";

///////////////////////////// Middleware /////////////////////////////

export function messageTypeProfileMiddleware(messageType) {
    return async (ctx) => {
        const currentMessageType = ctx.user_message_types.find(t => t.id === messageType.id)

        const priceStars = currentMessageType.price_stars
        const enabledMessageType = currentMessageType.active ? `Вкл.` : `Выкл`

        const messageText = `Стоимость сообщения: <b>${priceStars}</b> \n\nСтатус: <b>${enabledMessageType}</b> \n`

        await setSessionAttribute(ctx, { profile_message_type_id: messageType.id })
        await ctx.editMessageText(messageText, {
            parse_mode: "HTML"
        })

    }
}

async function enableMessageTypeMiddleware(ctx) {
    const messageTypeId = await getSessionAttribute(ctx, "profile_message_type_id")
    const messageType = await getMessageTypeById(ctx.user.id, messageTypeId)

    await changeActiveUserMessageType(ctx.user.id, messageTypeId, !messageType.active)

    await ctx.menu.update()

    // берем обновленные данные из базы
    const updatedMessageType = await getMessageTypeById(ctx.user.id, messageTypeId)

    const priceStars = updatedMessageType.price_stars
    const enabledMessageType = updatedMessageType.active ? `Вкл.` : `Выкл`

    const messageText = `Стоимость сообщения: <b>${priceStars}</b> \n\nСтатус: <b>${enabledMessageType}</b> \n`

    await ctx.editMessageText(messageText, {
        parse_mode: "HTML"
    })
}

async function backMiddleware(ctx) {
    await setSessionAttribute(ctx, { profile_message_type_id: null })

    const messageTypesText = ctx.user_message_types.map(messageType => {
        const enabledMessageType = messageType.active ? `Вкл.` : `Выкл`
        const price = messageType.price_stars

        return `\n${messageType.emoji} - ${messageType.ru_title} \n ┝ Статус: ${enabledMessageType} \n ┕ Стоимость сообщения: ${price} \n`
    }).join('')

    const messageText = `Настройка типов ответов: \n${messageTypesText}`
    await ctx.editMessageText(messageText, {
        reply_markup: messageTypesProfileMenu
    })
}

//////////////////////////////// Menu ///////////////////////////////

export const messageTypeProfileMenu = new Menu('message_type_profile_menu')
    .dynamic(async (ctx, range) => {
        const messageTypeId = await getSessionAttribute(ctx, "profile_message_type_id")

        const allMessageType = await findUserMessageTypes(ctx.user.id)
        const userMessageType = allMessageType.find(t => t.message_type_id === messageTypeId)
        const checkmark = userMessageType.active ? `✅` : `❌`

        range
            .text(
                checkmark,
                enableMessageTypeMiddleware
            )
            .row()
            .submenu(
                `Стоимость ⭐️`,
                'change_price_message_type',
                changePriceMessageTypeMiddleware
            )
            .row()

        return range
    })
    .text(backBtnMsg, backMiddleware)

messageTypeProfileMenu.register([changePriceMessageTypeMenu])