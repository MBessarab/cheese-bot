import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../../common/constants.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../../../../../common/session/index.mjs"
import {companionListSubmenuMiddleware} from "../../index.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function companionChatSubmenuMiddleware(ctx) {
    await setSessionAttribute(ctx, {chat_mode: "write"})

    await ctx.deleteMessage()

    const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")

    const newMsg = await ctx.api.sendMessage(ctx.user.chat_id, `Теперь напишите что-нибудь <b>${companionCandidate.nickname}</b> ✍`, {
        parse_mode: "HTML",
        reply_markup: companionChatMenu
    })

    await ctx.pinChatMessage(newMsg.message_id)
}

const backMiddleware = async (ctx, next) => {
    await setSessionAttribute(ctx, {chat_mode: null})
    await ctx.unpinAllChatMessages()
    await ctx.menu.nav('companion_list_menu')

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const companionChatMenu = new Menu('companion_chat_menu')
    .text(backBtnMsg, companionListSubmenuMiddleware, backMiddleware)
