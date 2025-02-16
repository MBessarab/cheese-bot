import {Menu, MenuRange} from "@grammyjs/menu"
import {companionListMenu, companionListSubmenuMiddleware} from "./companionListMenu.mjs"
import {initiatorListMenu, initiatorListSubmenuMiddleware} from "./initiatorListMenu.mjs"

//////////////////////////////// Menu ///////////////////////////////

export const mainMenu = new Menu("main_menu")
    .dynamic((ctx) => {
        return new MenuRange()
            .submenu(
                { text: 'Написать' },
                'companion_list_menu',
                companionListSubmenuMiddleware
            )
            .submenu(
                { text: 'Ответить' },
                'initiator_list_menu',
                initiatorListSubmenuMiddleware
            )
            .row()
    })

mainMenu.register([companionListMenu, initiatorListMenu])
