import {Menu} from "@grammyjs/menu"
import {backBtnMsg, chooseWriteMsg, helloMsg, nothingWriteMsg} from "../../../../common/constants.mjs"
import {companionProfileMenu, companionProfileSubmenuMiddleware} from "./companion_profile_menu/index.mjs"
import {findUsersByIds} from "../../../../persistence/users.mjs";
import {findRelationsFromUser} from "../../../../persistence/relation.mjs";

///////////////////////////// Middleware /////////////////////////////

const chooseWriteMsgHandler = async (ctx, relations) => {
    relations.length ?
        await ctx.editMessageText(chooseWriteMsg) :
        await ctx.editMessageText(nothingWriteMsg)
}

export async function companionListSubmenuMiddleware(ctx) {
    const relations = await findRelationsFromUser(ctx.user)
    ctx.relations = relations
    await chooseWriteMsgHandler(ctx, relations)
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
                        `${companion.nickname || companion.username}`,
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