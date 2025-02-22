import {Menu} from "@grammyjs/menu"
import {profileDescriptionMenu, showDescriptionProfileMiddleware} from "./profileDescriptionMenu.mjs"
import {backBtnMsg} from "../../constants.mjs"
import {setNicknameProfileMenu, setNicknameProfileMiddleware} from "./setNicknameProfileMenu.mjs"
import {addFundsBalanceProfileMenu, addFundsBalanceProfileMiddleware} from "./addFundsBalanceProfileMenu.mjs"
import {typesMessageProfileMenu, typesMessageProfileMiddleware} from "./typesMessageProfileMenu.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function profileSubmenuMiddleware(ctx, next) {
    await ctx.editMessageText(
        `Ваш никнейм: <b>${ctx.user.custom_username || ctx.user.username}</b> \n Баланс: `, {
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
                'Установить никнейм',
                'set_nickname_profile_menu',
                setNicknameProfileMiddleware
            )
            .submenu(
                'Описание профиля',
                'show_profile_description_menu',
                showDescriptionProfileMiddleware
            )
            .submenu(
                'Тип ответа',
                'types_message_profile_menu',
                typesMessageProfileMiddleware
            )
            .submenu(
                'Пополнить баланс',
                'add_funds_balance_profile_menu',
                addFundsBalanceProfileMiddleware
            )
            .row()
    })
    .back(backBtnMsg, backMiddleware)

profileMenu.register([
    profileDescriptionMenu,
    setNicknameProfileMenu,
    addFundsBalanceProfileMenu,
    typesMessageProfileMenu
])