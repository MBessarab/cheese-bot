import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../constants.mjs"

export const companionChatMenu = new Menu('companion_chat_menu')
    .text(backBtnMsg, async (ctx) => {
        await ctx.editMessageText("Выбрать, кому написать:")
        await ctx.unpinAllChatMessages()

        await ctx.menu.nav('companion_list_menu')
    })