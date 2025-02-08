import {Menu, MenuRange} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";

export const readMenu = new Menu("read_menu")
    .dynamic( (ctx) => {
        return new MenuRange()
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })