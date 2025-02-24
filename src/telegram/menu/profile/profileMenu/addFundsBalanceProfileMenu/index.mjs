import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function addFundsBalanceProfileMiddleware(ctx, next) {

    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const addFundsBalanceProfileMenu = new Menu('add_funds_balance_profile_menu')
    .back(backBtnMsg, backMiddleware)