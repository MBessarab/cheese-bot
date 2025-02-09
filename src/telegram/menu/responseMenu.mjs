import {Menu, MenuRange} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";

export const responseMenu = new Menu("response_menu")
    .dynamic( (ctx) => {
        return new MenuRange()
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })