import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"
import {messageTypeProfileMenu, messageTypeProfileMiddleware} from "./messageTypeProfileMenu/index.mjs"
import {getAllMessageTypes} from "./persistence.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function messageTypesProfileMiddleware(ctx, next) {
    ctx.all_message_types = await getAllMessageTypes()

    return await next()
}


const backMiddleware = async (ctx, next) => {

    return await next()
}


//////////////////////////////// Menu ///////////////////////////////

export const messageTypesProfileMenu = new Menu("message_types_profile_menu")
    .dynamic(async (ctx, range) => {
        const allMessageTypes = ctx.all_message_types || await getAllMessageTypes()

        allMessageTypes.forEach(messageType => {
            range
                .submenu(
                    `${messageType.emoji}`,
                    'message_type_profile_menu',
                    messageTypeProfileMiddleware(messageType)
                )
        })
        
        return range
    })
    .back(backBtnMsg, backMiddleware)

messageTypesProfileMenu.register([messageTypeProfileMenu])