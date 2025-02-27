import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {companionChatMenu, companionChatSubmenuMiddleware} from "./companion_chat_menu/index.mjs"
import {getSessionAttribute, setSessionAttribute} from "../../../../../common/session/index.mjs"
import {companionListSubmenuMiddleware} from "../index.mjs"
import {findRelation, updateRelationTypeMessages} from "../../../../../persistence/relation.mjs";
import {findActiveUserMessageTypesPrice} from "../../../../../persistence/user_message_type.mjs";

///////////////////////////// Middleware /////////////////////////////

export function companionProfileSubmenuMiddleware(companion) {
    return async (ctx, next) => {
        await ctx.unpinAllChatMessages()

        await setSessionAttribute(ctx, {companion_candidate: companion})

        if(companion.photo) {
            await ctx.editMessageMedia({
                type: "photo",
                caption: companion.description || 'Описание отсутствует',
                media: companion.photo
            })
        } else {
            await ctx.editMessageText(companion.description || 'Описание отсутствует')
        }

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
        const messageTypesCompanion = await findActiveUserMessageTypesPrice(companionCandidate)

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
                .text(
                    "Начать диалог",
                    companionChatSubmenuMiddleware
                )
        }

        return range
    })
    .row()
    .back(backBtnMsg, backMiddleware, companionListSubmenuMiddleware)


companionProfileMenu.register([companionChatMenu])