import {Menu} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";
import {findRelationsFromUser} from "../../persistence/relation.mjs";
import {findUsersByIds} from "../../persistence/user.mjs";
import {companionProfileMenu} from "./companionProfileMenu.mjs";

export const companionsMenu  = new Menu("companions_menu")
    .dynamic( async (ctx, range) => {
        const relations = await findRelationsFromUser(ctx.user)
        const companionIds = relations.map((r) => r.companion_user_id)

        const listConversations = async () => {
            const companions = await findUsersByIds(companionIds)

            companions.forEach((companion) => {
                range
                    .submenu(
                        `${companion.custom_username}`,
                        "companion_profile_menu",
                        async (ctx, next) => {
                            const session = await ctx.session
                            // Записать собеседника из payload в текущий диалог
                            session.companion_candidate = companion

                            await ctx.editMessageText(companion.greeting_message)

                            await next()
                        }
                    )
                    .row()
            })
        }

        // если user уже общался с кем-то или открывал профиль
        if (companionIds.length) await listConversations()

        return range
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })

companionsMenu.register(companionProfileMenu)