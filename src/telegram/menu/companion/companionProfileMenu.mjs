import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../constants.mjs"
import {companionChatMenu, companionChatSubmenuMiddleware} from "./companionChatMenu.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../session/index.mjs"
import {companionListSubmenuMiddleware} from "./companionListMenu.mjs"
import {getUserTypesMessage} from "../../../persistence/userMessageTypes.mjs";
import {findRelation, updateRelationTypeMessages} from "../../../persistence/relation.mjs";

///////////////////////////// Middleware /////////////////////////////

export function companionProfileSubmenuMiddleware(companion) {
    return async (ctx, next) => {
        await ctx.unpinAllChatMessages()

        await setSessionAttribute(ctx, {companion_candidate: companion})

        await ctx.editMessageText(companion.greeting_message)
        return await next()
    }
}

function saveTypeMessageReply(companionCandidate, typeMessage, checked) {
    return async (ctx, next) => {
        await updateRelationTypeMessages(ctx.user, companionCandidate, typeMessage, !checked)

        await ctx.menu.update()
        await next()
    }
}

const backMiddleware = async (ctx, next) => await next()

//////////////////////////////// Menu ///////////////////////////////

export const companionProfileMenu = new Menu('companion_profile_menu')
    .dynamic(async (ctx, range) => {
        const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")
        const typesMessageCompanion = await getUserTypesMessage(companionCandidate)

        const relation = await findRelation(ctx.user, companionCandidate)
        const relationTypeMessageId = relation.reply_type_message_id

        typesMessageCompanion.forEach(typeMessage => {
            const checked = relationTypeMessageId === typeMessage.id
            const checkTypeMessage = checked ? `✅` : `❌`

            range
                .text(
                    `${checkTypeMessage} ${typeMessage.emoji}`,
                    saveTypeMessageReply(companionCandidate, typeMessage, checked)
                )
        })

        // Разрешаем начать диалог, если установлен тип ответа
        if(relationTypeMessageId) {
            range
                .row()
                .submenu(
                    "Начать диалог",
                    "companion_chat_menu",
                    companionChatSubmenuMiddleware
                )
        }

        return range
    })
    .row()
    .back(backBtnMsg, backMiddleware, companionListSubmenuMiddleware)


companionProfileMenu.register([companionChatMenu])