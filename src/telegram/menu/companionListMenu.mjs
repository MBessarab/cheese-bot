import {Menu} from "@grammyjs/menu"
import {backBtnMsg, helloMsg} from "../constants.mjs"
import {findRelationsFromUser} from "../../persistence/relation.mjs"
import {findUsersByIds} from "../../persistence/user.mjs"
import {companionProfileMenu, companionProfileSubmenuMiddleware} from "./companionProfileMenu.mjs"
import {chooseWriteMsgHandler} from "../common/chooseWriteMsgHandler.mjs"

///////////////////////////// Middleware /////////////////////////////

export const companionListSubmenuMiddleware = async (ctx, next) => {
    const relations = await findRelationsFromUser(ctx.user)
    ctx.relations = relations
    await chooseWriteMsgHandler(ctx, relations)
    return await next()
}

const backMiddleware = async (ctx) => {
    await ctx.editMessageText(helloMsg)
}

//////////////////////////////// Menu ///////////////////////////////

export const companionListMenu  = new Menu("companion_list_menu")
    .dynamic( async (ctx, range) => {
        const relations = await ctx.relations || await findRelationsFromUser(ctx.user)
        const companionIds = relations.map((r) => r.companion_user_id)

        const listConversations = async () => {
            const companions = await findUsersByIds(companionIds)

            companions.forEach((companion) => {
                range
                    .submenu(
                        `${companion.custom_username || companion.username}`,
                        "companion_profile_menu",
                        companionProfileSubmenuMiddleware(companion)
                    )
                    .row()
            })
        }

        // если user уже общался с кем-то или открывал профиль
        if (companionIds.length) await listConversations()

        return range
    })
    .row()
    .back(backBtnMsg, backMiddleware)

companionListMenu.register(companionProfileMenu)