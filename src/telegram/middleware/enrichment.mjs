import {Composer} from "grammy"
import {createDefaultUserMessageTypes, getOrCreateUser, getUserMessageTypes} from "./persistence.mjs"

export async function userMiddleware(ctx, next) {
    ctx.user = await getOrCreateUser(ctx.from, ctx.chatId)

    return await next()
}

export async function userMessageTypesMiddleware(ctx, next) {
    await createDefaultUserMessageTypes(ctx.user)
    ctx.user_message_types = await getUserMessageTypes(ctx.user)

    return await next()
}

//Фильтр заблокированных пользователей
export const filterBlockedUsers =  async (ctx) => !ctx.user.blocked

// middleware для обогащения контекста
export const middleware = new Composer()

middleware
    .use(userMiddleware)
    .filter(filterBlockedUsers)
    .use(userMessageTypesMiddleware)