import {backBtnMsg} from "../../../../../common/constants.mjs"
import {Menu} from "@grammyjs/menu"
import {setSessionAttribute} from "../../../../../common/session/index.mjs"
import {profileSubmenuMiddleware} from "../index.mjs";
import {changeProfileDescriptionMenu} from "../change_profile_description_menu/index.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function changeNicknameProfileMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: 'change_profile_nickname'})

    await ctx.deleteMessage()

    await ctx.api.sendMessage(ctx.user.chat_id, 'Введите новый никнейм.', {
        reply_markup: changeNicknameProfileMenu
    })
}

async function backMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: null })

    await profileSubmenuMiddleware(ctx)
}

//////////////////////////////// Menu ///////////////////////////////

export const changeNicknameProfileMenu = new Menu('change_nickname_profile_menu')
    .back(backBtnMsg, backMiddleware)