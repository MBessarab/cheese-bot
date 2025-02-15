import {Menu, MenuRange} from "@grammyjs/menu"
import {companionListMenu} from "./companionListMenu.mjs"
import {initiatorListMenu} from "./initiatorListMenu.mjs"

export const mainMenu = new Menu("main_menu")
    .dynamic((ctx) => {
        return new MenuRange()
            .submenu(
                { text: 'Написать' }, // label and payload
                'companion_list_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому написать:")
                    return await next()
                }
            )
            .submenu(
                { text: 'Ответить' }, // label and payload
                'initiator_list_menu',
                async (ctx, next) => {
                    await ctx.editMessageText("Выбрать, кому ответить:")
                    return await next()
                }
            )
            .row()
    })

mainMenu.register([companionListMenu, initiatorListMenu])
