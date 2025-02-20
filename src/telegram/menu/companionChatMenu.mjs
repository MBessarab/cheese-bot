import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../constants.mjs"
import {chooseWriteMsgHandler} from "../common/chooseWriteMsgHandler.mjs"
import {session} from "grammy"
import {getSessionAttribute, setSessionAttribute} from "../session/index.mjs"
import {findRelationsFromUser} from "../../persistence/relation.mjs";

///////////////////////////// Middleware /////////////////////////////

export const companionChatSubmenuMiddleware = async (ctx, next) => {
    await setSessionAttribute(ctx, {chat_mode: "write"})
    const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")

    await ctx.pinChatMessage(ctx.msgId)

    await ctx.editMessageText(
        `Теперь напишите что-нибудь <b>${companionCandidate.custom_username}</b> ✍`,
        { parse_mode: "HTML" }
    )

    return await next()
}

const backMiddleware = async (ctx) => {
    const relations = await findRelationsFromUser(ctx.user)
    ctx.relations = relations

    await chooseWriteMsgHandler(ctx, relations)

    await setSessionAttribute(ctx, {chat_mode: null})
    await ctx.unpinAllChatMessages()
    await ctx.menu.nav('companion_list_menu')
}

//////////////////////////////// Menu ///////////////////////////////

export const companionChatMenu = new Menu('companion_chat_menu')
    .text(backBtnMsg, backMiddleware)
