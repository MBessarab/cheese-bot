import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function changeProfileDescriptionMiddleware(ctx, next) {

    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const changeProfileDescriptionMenu = new Menu('change_profile_description_menu')
    .back(backBtnMsg, backMiddleware)