import {saveInitiatorMessage} from "../../persistence/message.mjs"
import {getSessionAttribute} from "../session/index.mjs"

export const writeMessageHandler = async (ctx) => {
    const companionCandidate = await getSessionAttribute(ctx, "companion_candidate")
    await saveInitiatorMessage(ctx.msg, companionCandidate)

    // Изменить сообщение компаньона по ид из сессии компаньону уведомление о новых сообщениях
    // await ctx.api.sendMessage(companionCandidate.chat_id, "У вас есть новые сообщения 🙋🏻‍♂️", {
    //     reply_markup: initiatorListMenu
    // })
}
