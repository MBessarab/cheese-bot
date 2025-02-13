import {Menu, MenuRange} from "@grammyjs/menu";
import {companionsMenu} from "./companionsMenu.mjs";
import {initiatorsMenu} from "./initiatorsMenu.mjs";

export const mainMenu = new Menu("main_menu")
    .dynamic((ctx) => {
        return new MenuRange()
            .submenu(
                { text: 'Написать' }, // label and payload
                'companions_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому написать:")
                    return await next()
                }
            )
            .submenu(
                { text: 'Ответить' }, // label and payload
                'initiators_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому ответить:")
                    return await next()
                }
            )
            .row()
    })

mainMenu.register([companionsMenu, initiatorsMenu])
