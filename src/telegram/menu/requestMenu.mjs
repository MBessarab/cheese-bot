import {Menu} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";
import {findRelationsFromUser} from "../../persistence/relation.mjs";
import {findUsersByIds} from "../../persistence/user.mjs";
import {userProfileMenu} from "./userProfileMenu.mjs";

export const requestMenu = new Menu("request_menu")
    .dynamic( async (ctx, range) => {
        const relations = await findRelationsFromUser(ctx.user)
        const companionIds = relations.map((r) => r.responder_user_id)

        if (companionIds.length) {
            const companions = await findUsersByIds(companionIds)

            companions.forEach((companion) => {
                range
                    .submenu(
                        { text: `${companion.custom_username}`, payload: companion.user_id.toString() },
                        "open_request_conversation",
                        async (ctx, next) => {
                            await ctx.editMessageText("some 1")

                            // Записать собеседника из payload в сессию
                            const session = await ctx.session
                            session.current_companion_id = ctx.match
                            await next()
                        }
                    )
                    .row()
            })
            return range
        } else {
            // Если пользователь еще ни с кем не общался
            return range
        }
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })

requestMenu.register(userProfileMenu)