import {checkAvailableUsers, isUser} from "./userHelper.mjs"

// Отфильтровать сообщения от других ботов
export const filterBotsMiddleware =  async (ctx) => checkAvailableUsers(ctx)

// Удалить закрепленное сообщение от бота
export const deletePinMessageAlert =  async (ctx) => {
    if(!isUser(ctx) && ctx.msg.pinned_message) {
        setTimeout(async () => await ctx.deleteMessage(), 3500)

        return false
    } else {
        return true
    }
}
