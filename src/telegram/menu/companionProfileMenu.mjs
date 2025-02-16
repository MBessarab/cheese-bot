import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../constants.mjs"
import {companionChatMenu, companionChatSubmenuMiddleware} from "./companionChatMenu.mjs"
import {chooseWriteMsgHandler} from "../common/chooseWriteMsgHandler.mjs"

///////////////////////////// Middleware /////////////////////////////

export const companionProfileSubmenuMiddleware = (companion) => {
    return async (ctx, next) => {
        await ctx.unpinAllChatMessages()

        const session = await ctx.session
        session.companion_candidate = companion

        await ctx.editMessageText(companion.greeting_message)
        return await next()
    }
}

const backMiddleware = async (ctx) => await chooseWriteMsgHandler(ctx)


//////////////////////////////// Menu ///////////////////////////////

export const companionProfileMenu = new Menu('companion_profile_menu')
    .dynamic(async (ctx, range) => {
        return range
            .submenu(
                "Начать диалог",
                "companion_chat_menu",
                companionChatSubmenuMiddleware
            )
    })
    .row()
    .back(backBtnMsg, backMiddleware)


companionProfileMenu.register([companionChatMenu])