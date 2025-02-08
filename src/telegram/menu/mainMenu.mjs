import {Menu, MenuRange} from "@grammyjs/menu";

export const mainMenu = new Menu("main_menu")
    .dynamic(() => {
        return new MenuRange()
            .submenu(
                { text: 'Написать' }, // label and payload
                'write_menu', // navigation target menu
                async ctx => {
                    await ctx.editMessageText("Выбрать, кому написать") // handler
                })
            .submenu(
                { text: 'Ответить' }, // label and payload
                'read_menu', // navigation target menu
                async ctx =>
                    await ctx.editMessageText("Выбрать, кому ответить") // handler
            )
            .row()
    })