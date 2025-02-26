import {Menu} from "@grammyjs/menu"
import {companionListMenu, companionListSubmenuMiddleware} from "./companion/companion_list_menu/index.mjs"
import {initiatorListMenu, initiatorListSubmenuMiddleware} from "./initiator/initiator_list_menu/index.mjs"
import {profileMenu, profileSubmenuMiddleware} from "./profile/profile_menu/index.mjs"

//////////////////////////////// Menu ///////////////////////////////

export const mainMenu = new Menu("main_menu")
    .dynamic((ctx, range) => {
        return range
            .submenu(
                { text: 'Профиль' },
                'profile_menu',
                profileSubmenuMiddleware
            )
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

mainMenu.register([companionListMenu, initiatorListMenu, profileMenu])
