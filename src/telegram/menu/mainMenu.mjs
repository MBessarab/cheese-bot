import {Menu, MenuRange} from "@grammyjs/menu";

export const mainMenu = new Menu("main_menu")
    .dynamic((ctx) => {
        return new MenuRange()
            .submenu(
                { text: 'Написать' }, // label and payload
                'request_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому написать:")
                    await next()
                }
            )
            .submenu(
                { text: 'Ответить' }, // label and payload
                'response_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому ответить:")
                    await next()
                }
            )
            .row()
    })
