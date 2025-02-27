import {getSessionAttribute} from "../../common/session/index.mjs"
import {findRelation} from "../../persistence/relation.mjs";
import {findTypeMessageById} from "../../persistence/user_message_type.mjs";
import {saveInitiatorMessage} from "../../persistence/messages.mjs";

export const writeMessageHandler = async (ctx) => {
    const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")
    const relation = await findRelation(ctx.user, companionCandidate)

    const price = await findTypeMessageById(relation.reply_message_type_id)
        .then(t => t.price_stars)
    await saveInitiatorMessage(ctx.msg, companionCandidate, relation.reply_message_type_id, price)

    // Изменить сообщение компаньона по ид из сессии компаньону уведомление о новых сообщениях
    // await ctx.api.sendMessage(companionCandidate.chat_id, "У вас есть новые сообщения 🙋🏻‍♂️", {
    //     reply_markup: initiator_list_menu
    // })
}
