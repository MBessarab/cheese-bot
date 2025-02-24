import {backBtnMsg} from "../../../../common/constants.mjs"
import {Menu} from "@grammyjs/menu"
import {setSessionAttribute} from "../../../../common/session/index.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function changeNicknameProfileMiddleware(ctx, next) {
    await ctx.editMessageText("Введите новый никнейм")
    await setSessionAttribute(ctx, { chat_mode: 'change_profile_nickname'})
    return await next()
}

async function backMiddleware(ctx, next) {
    await setSessionAttribute(ctx, { chat_mode: null })
    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const changeNicknameProfileMenu = new Menu('change_nickname_profile_menu')
    .back(backBtnMsg, backMiddleware)