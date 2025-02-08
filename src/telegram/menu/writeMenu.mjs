import {Menu, MenuRange} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";

export const writeMenu = new Menu("write_menu")
    .dynamic( (ctx) => {
        return new MenuRange()
            .submenu(
                "<-",
                "write_menu",
                async (ctx) => {
                    await ctx.editMessageText("edited second text" + q++)
                }
            )
            .submenu(
                "->",
                "write_menu",
                async (ctx) => {
                    await ctx.editMessageText("edited second text" + q++) // текст необходимо менять
                }
            )
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })
