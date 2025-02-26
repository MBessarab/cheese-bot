import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"
import {changeNicknameProfileMenu, changeNicknameProfileMiddleware} from "./change_nickname_profile_menu/index.mjs"
import {addFundsBalanceProfileMenu, addFundsBalanceProfileMiddleware} from "./add_funds_balance_profile_menu/index.mjs"
import {messageTypesProfileMenu, messageTypesProfileMiddleware} from "./message_types_profile_menu/index.mjs"
import {
    changeProfileDescriptionMenu,
    changeProfileDescriptionMiddleware
} from "./change_profile_description_menu/index.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function profileSubmenuMiddleware(ctx) {
    const messageText = `Никнейм: <b>${ctx.user.nickname || ctx.user.username}</b>` +
        `\n\n${ctx.user.description || 'Описание отсутствует'}` +
        `\n\nБаланс: ${ctx.user.balance_stars}`

    if(ctx.user.photo) {
        await ctx.editMessageMedia({
            type: "photo",
            caption: messageText,
            media: ctx.user.photo
        }, {
            parse_mode: "HTML"
        })
    } else {
        await ctx.editMessageText(messageText, {
            parse_mode: "HTML"
        })
    }
}

async function backMiddleware(ctx) {

}

//////////////////////////////// Menu ///////////////////////////////

export const profileMenu = new Menu("profile_menu")
    .dynamic((ctx, range) => {
        return range
            .text(
                'Пополнить баланс',
                addFundsBalanceProfileMiddleware
            )
            .row()
            .text(
                'Изменить описание',
                changeProfileDescriptionMiddleware
            )
            .row()
            .text(
                'Типы ответа',
                messageTypesProfileMiddleware
            )
            .row()
            .text(
                'Изменить никнейм',
                changeNicknameProfileMiddleware
            )
            .row()
    })
    .back(backBtnMsg, backMiddleware)

profileMenu.register([
    changeProfileDescriptionMenu,
    changeNicknameProfileMenu,
    addFundsBalanceProfileMenu,
    messageTypesProfileMenu
])