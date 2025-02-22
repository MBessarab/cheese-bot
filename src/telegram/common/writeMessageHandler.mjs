import {saveInitiatorMessage} from "../../persistence/message.mjs"
import {getSessionAttribute} from "../session/index.mjs"
import {findRelation} from "../../persistence/relation.mjs";
import {findTypeMessageById} from "../../persistence/userMessageTypes.mjs"

export const writeMessageHandler = async (ctx) => {
    const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")
    const relation = await findRelation(ctx.user, companionCandidate)

    const cost = await findTypeMessageById(relation.reply_type_message_id)
        .then(t => t.price_stars)
    await saveInitiatorMessage(ctx.msg, companionCandidate, relation.reply_type_message_id, cost)

    // Изменить сообщение компаньона по ид из сессии компаньону уведомление о новых сообщениях
    // await ctx.api.sendMessage(companionCandidate.chat_id, "У вас есть новые сообщения 🙋🏻‍♂️", {
    //     reply_markup: initiatorListMenu
    // })
}
