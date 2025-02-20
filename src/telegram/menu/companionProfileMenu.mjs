import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../constants.mjs"
import {companionChatMenu, companionChatSubmenuMiddleware} from "./companionChatMenu.mjs"
import {chooseWriteMsgHandler} from "../common/chooseWriteMsgHandler.mjs"
import {setSessionAttribute} from "../session/index.mjs"
import {findRelationsFromUser} from "../../persistence/relation.mjs";

///////////////////////////// Middleware /////////////////////////////

export const companionProfileSubmenuMiddleware = (companion) => {
    return async (ctx, next) => {
        await ctx.unpinAllChatMessages()

        await setSessionAttribute(ctx, {companion_candidate: companion})

        await ctx.editMessageText(companion.greeting_message)
        return await next()
    }
}

const backMiddleware = async (ctx) => {
    const relations = await findRelationsFromUser(ctx.user)
    ctx.relations = relations

    await chooseWriteMsgHandler(ctx, relations)
}


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