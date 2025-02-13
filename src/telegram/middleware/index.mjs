import {Composer} from "grammy";
import {getOrCreateUser} from "../../persistence/user.mjs";


const isUser = (ctx) => !ctx.from.is_bot
const isOtherBot = (ctx) => !isUser && (ctx.from.id !== ctx.me.id)
const isMeAsBot = (ctx) => !isOtherBot(ctx)

const checkAvailableUsers = (ctx) =>  isUser(ctx) || isMeAsBot(ctx)

export async function userMiddleware(ctx, next) {
    ctx.user = await getOrCreateUser(ctx.from)

    return await next()
}
// middleware для обогащения контекста
export const middleware = new Composer()
    .use(userMiddleware)

// Отфильтровать сообщения от других ботов
export const filterBotsMiddleware =  async (ctx) => checkAvailableUsers(ctx)

// Удалить закрепленное сообщение от бота
export const deletePinMessageAlert =  async (ctx) => {
    if(!isUser(ctx) && ctx.msg.pinned_message) {
        await ctx.deleteMessage()

        // // поставить реакцию на закрепленное сообщение
        // await ctx.react(Reactions.writing_hand, {message_id: ctx.msg.pinned_message.message_id})
        return false
    } else {
        return true
    }
}