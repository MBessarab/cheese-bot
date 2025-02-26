import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {messageTypeProfileMenu, messageTypeProfileMiddleware} from "./message_type_profile_menu/index.mjs"
import {profileSubmenuMiddleware} from "../index.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function messageTypesProfileMiddleware(ctx) {
    await ctx.deleteMessage()

    const messageTypesText = ctx.user_message_types.map(messageType => {
        const enabledMessageType = messageType.active ? `Вкл.` : `Выкл`

        return `\n${messageType.emoji} - ${messageType.ru_title} \n ┝ Статус: ${enabledMessageType} \n ┕ Стоимость сообщения: ${messageType.price_stars} \n`
    }).join('')

    const messageText = `Настройка типов ответов: \n${messageTypesText}`
    await ctx.api.sendMessage(ctx.user.chat_id, messageText, {
        reply_markup: messageTypesProfileMenu
    })
}


const backMiddleware = async (ctx) => {
    await profileSubmenuMiddleware(ctx)
}


//////////////////////////////// Menu ///////////////////////////////

export const messageTypesProfileMenu = new Menu("message_types_profile_menu")
    .dynamic(async (ctx, range) => {
        ctx.user_message_types.forEach(messageType => {
            range
                .submenu(
                    `${messageType.emoji}`,
                    'message_type_profile_menu',
                    messageTypeProfileMiddleware(messageType)
                )
        })
        
        return range
    })
    .back(backBtnMsg, backMiddleware)

messageTypesProfileMenu.register([messageTypeProfileMenu])