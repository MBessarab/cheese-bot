import {backBtnMsg} from "../../../../common/constants.mjs"
import {Menu} from "@grammyjs/menu"

///////////////////////////// Middleware /////////////////////////////

export async function setNicknameProfileMiddleware(ctx, next) {
    await ctx.editMessageText("Как вас представлять?")

    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const setNicknameProfileMenu = new Menu('set_nickname_profile_menu')
    .back(backBtnMsg, backMiddleware)