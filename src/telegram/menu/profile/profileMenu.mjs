import {Menu} from "@grammyjs/menu"
import {profileDescriptionMenu, showDescriptionProfileMiddleware} from "./profileDescriptionMenu.mjs"
import {backBtnMsg} from "../../constants.mjs"
import {setNicknameProfileMenu, setNicknameProfileMiddleware} from "./setNicknameProfileMenu.mjs"
import {addFundsBalanceProfileMenu, addFundsBalanceProfileMiddleware} from "./addFundsBalanceProfileMenu.mjs"
import {messageTypesProfileMenu, messageTypesProfileMiddleware} from "./messageTypesProfileMenu.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function profileSubmenuMiddleware(ctx, next) {
    await ctx.editMessageText(
        `Никнейм: <b>${ctx.user.custom_username || ctx.user.username}</b>\nБаланс: ${ctx.user.balance_stars} ⭐️\n`, {
            parse_mode: "HTML"
        }
    )

    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const profileMenu = new Menu("profile_menu")
    .dynamic((ctx, range) => {
        return range
            .submenu(
                'Пополнить баланс',
                'add_funds_balance_profile_menu',
                addFundsBalanceProfileMiddleware
            )
            .row()
            .submenu(
                'Описание профиля',
                'show_profile_description_menu',
                showDescriptionProfileMiddleware
            )
            .row()
            .submenu(
                'Типы ответа',
                'message_types_profile_menu',
                messageTypesProfileMiddleware
            )
            .row()
            .submenu(
                'Установить никнейм',
                'set_nickname_profile_menu',
                setNicknameProfileMiddleware
            )
            .row()
    })
    .back(backBtnMsg, backMiddleware)

profileMenu.register([
    profileDescriptionMenu,
    setNicknameProfileMenu,
    addFundsBalanceProfileMenu,
    messageTypesProfileMenu
])