export const isUser = (ctx) => !ctx.from.is_bot

export const isOtherBot = (ctx) => !isUser && (ctx.from.id !== ctx.me.id)

export const isMeAsBot = (ctx) => !isOtherBot(ctx)

export const checkAvailableUsers = (ctx) =>  isUser(ctx) || isMeAsBot(ctx)

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
