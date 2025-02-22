import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../constants.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function typesMessageProfileMiddleware(ctx, next) {

    return await next()
}


const backMiddleware = async (ctx, next) => {

    return await next()
}


//////////////////////////////// Menu ///////////////////////////////

export const typesMessageProfileMenu = new Menu("types_message_profile_menu")
    .dynamic((ctx, range) => {

        return range
    })
    .back(backBtnMsg, backMiddleware)