import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"
import {changeProfileDescriptionMenu, changeProfileDescriptionMiddleware} from "./changeProfileDescriptionMenu/index.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function showDescriptionProfileMiddleware(ctx, next) {

    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const profileDescriptionMenu = new Menu("show_profile_description_menu")
    .dynamic((ctx, range) => {
        return range
            .submenu(
                'Изменить описание профиля',
                'change_profile_description_menu',
                changeProfileDescriptionMiddleware
            )
            .row()
    })
    .back(backBtnMsg, backMiddleware)


profileDescriptionMenu.register([changeProfileDescriptionMenu])