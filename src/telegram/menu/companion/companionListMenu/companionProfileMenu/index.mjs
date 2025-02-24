import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"
import {companionChatMenu, companionChatSubmenuMiddleware} from "./companionChatMenu/index.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../../../common/session/index.mjs"
import {companionListSubmenuMiddleware} from "../index.mjs"
import {updateRelationTypeMessages} from "./persistence.mjs";
import {findRelation, getUserMessageTypes} from "../../../../common/persistence/index.mjs";

///////////////////////////// Middleware /////////////////////////////

export function companionProfileSubmenuMiddleware(companion) {
    return async (ctx, next) => {
        await ctx.unpinAllChatMessages()

        await setSessionAttribute(ctx, {companion_candidate: companion})

        await ctx.editMessageText(companion.greeting_message)
        return await next()
    }
}

function saveTypeMessageReply(companionCandidate, messageType, checked) {
    return async (ctx, next) => {
        await updateRelationTypeMessages(ctx.user, companionCandidate, messageType, !checked)

        await ctx.menu.update()
        await next()
    }
}

const backMiddleware = async (ctx, next) => await next()

//////////////////////////////// Menu ///////////////////////////////

export const companionProfileMenu = new Menu('companion_profile_menu')
    .dynamic(async (ctx, range) => {
        const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")
        const messageTypesCompanion = await getUserMessageTypes(companionCandidate)

        const relation = await findRelation(ctx.user, companionCandidate)
        const relationTypeMessageId = relation.reply_message_type_id

        messageTypesCompanion.forEach(messageType => {
            const checked = relationTypeMessageId === messageType.id
            const checkTypeMessage = checked ? `✅` : ``

            range
                .text(
                    `${checkTypeMessage} ${messageType.emoji}`,
                    saveTypeMessageReply(companionCandidate, messageType, checked)
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