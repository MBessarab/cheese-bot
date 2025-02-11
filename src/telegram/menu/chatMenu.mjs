import {Menu} from "@grammyjs/menu";
import {backBtnMsg} from "../constants.mjs";

export const chatMenu = new Menu('companion_chat_menu')
    .text(backBtnMsg, async (ctx) => {
        await ctx.editMessageText("Выбрать, кому написать:")
        await ctx.unpinChatMessage(ctx.msgId)
        await ctx.menu.nav('companions_menu')
    })