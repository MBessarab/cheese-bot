import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {setSessionAttribute} from "../../../../../common/session/index.mjs";
import {profileSubmenuMiddleware} from "../index.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function addFundsBalanceProfileMiddleware(ctx) {
    // await setSessionAttribute(ctx, { chat_mode: 'change_profile_description' })

    await ctx.deleteMessage()

    await ctx.api.sendMessage(ctx.user.chat_id, "Пополнить баланс!", {reply_markup: addFundsBalanceProfileMenu})
}

async function backMiddleware(ctx) {
    await profileSubmenuMiddleware(ctx)
}

//////////////////////////////// Menu ///////////////////////////////

export const addFundsBalanceProfileMenu = new Menu('add_funds_balance_profile_menu')
    .back(backBtnMsg, backMiddleware)