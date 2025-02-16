import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../constants.mjs"
import {chooseWriteMsgHandler} from "../common/chooseWriteMsgHandler.mjs"
import {session} from "grammy"

///////////////////////////// Middleware /////////////////////////////

export const companionChatSubmenuMiddleware = async (ctx, next) => {
    const session = await ctx.session
    session.chat_mode = 'write'

    await ctx.pinChatMessage(ctx.msgId)

    await ctx.editMessageText(
        `Теперь напишите что-нибудь <b>${session.companion_candidate.custom_username}</b> ✍`,
        { parse_mode: "HTML" }
    )

    return await next()
}

const backMiddleware = async (ctx) => {
    await chooseWriteMsgHandler(ctx)

    await ctx.session.then(session => session.chat_mode = null)
    await ctx.unpinAllChatMessages()
    await ctx.menu.nav('companion_list_menu')
}

//////////////////////////////// Menu ///////////////////////////////

export const companionChatMenu = new Menu('companion_chat_menu')
    .text(backBtnMsg, backMiddleware)
