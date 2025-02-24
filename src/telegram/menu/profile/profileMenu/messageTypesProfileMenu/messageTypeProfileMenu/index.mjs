import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {getAllMessageTypes} from "../persistence.mjs"
import {addUserMessageType, deleteUserMessageType, findUserMessageType} from "./persistence.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../../../../common/session/index.mjs"
import {changePriceMessageTypeMenu, changePriceMessageTypeMiddleware} from "./changePriceMessageTypeMenu/index.mjs"
import {messageTypesProfileMenu} from "../index.mjs"

///////////////////////////// Middleware /////////////////////////////

export function messageTypeProfileMiddleware(messageType) {
    return async (ctx) => {
        await setSessionAttribute(ctx, { profile_message_type: messageType })
    }
}

async function enableMessageTypeMiddleware(ctx) {
    const messageType = await getSessionAttribute(ctx, "profile_message_type")

    ctx.user_message_types.find(t => t.id === messageType.id) ?
        await deleteUserMessageType(ctx.user.id, messageType.id) :
        await addUserMessageType(ctx.user.id, messageType.id)

    await ctx.menu.update()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const messageTypeProfileMenu = new Menu('message_type_profile_menu')
    .dynamic(async (ctx, range) => {
        const messageType = await getSessionAttribute(ctx, "profile_message_type")

        const userMessageType = await findUserMessageType(ctx.user.id, messageType.id)
        const checkmark = userMessageType ? `✅` : `❌`

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
    .back(backBtnMsg, backMiddleware)

messageTypeProfileMenu.register([changePriceMessageTypeMenu])