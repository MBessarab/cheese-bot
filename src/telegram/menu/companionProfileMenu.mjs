import {Menu} from "@grammyjs/menu";
import {backBtnMsg} from "../constants.mjs";
import {chatMenu} from "./chatMenu.mjs";


export const companionProfileMenu = new Menu('companion_profile_menu')
    .dynamic(async (ctx, range) => {
        return range
            .submenu(
                "Начать диалог",
                "companion_chat_menu",
                async (ctx, next) => {
                    const session = await ctx.session
                    session.chat_mode = 'write'

                    await ctx.editMessageText(
                        `Вы общаетесь с <b>${session.companion_candidate.custom_username}</b>`,
                        { parse_mode: "HTML" }
                    )

                    await ctx.pinChatMessage(ctx.msgId)

                    return await next()
                }
            )
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText("Выбрать, кому написать:")
    })


companionProfileMenu.register([chatMenu])