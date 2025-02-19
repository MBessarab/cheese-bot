// Отфильтровать сообщения от других ботов
import {checkAvailableUsers, isUser} from "./userHelper.mjs"
import {Reactions} from "@grammyjs/emoji";

export const filterBotsMiddleware =  async (ctx) => checkAvailableUsers(ctx)

// Удалить закрепленное сообщение от бота
export const deletePinMessageAlert =  async (ctx) => {
    if(!isUser(ctx) && ctx.msg.pinned_message) {
        setTimeout(async () => await ctx.deleteMessage(), 3500)

        // // поставить реакцию на закрепленное сообщение
        // await ctx.react(Reactions.writing_hand, {message_id: ctx.msg.pinned_message.message_id})
        return false
    } else {
        return true
    }
}
