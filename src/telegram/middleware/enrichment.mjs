import {Composer} from "grammy"
import {getOrCreateUser} from "../../persistence/user.mjs"
import {createDefaultUserMessageTypes, getUserMessageTypes} from "../../persistence/userMessageTypes.mjs"


export async function userMiddleware(ctx, next) {
    ctx.user = await getOrCreateUser(ctx.from, ctx.chatId)

    return await next()
}

export async function userMessageTypesMiddleware(ctx, next) {
    await createDefaultUserMessageTypes(ctx.user)
    ctx.user_message_types = await getUserMessageTypes(ctx.user)

    return await next()
}

// middleware для обогащения контекста
export const middleware = new Composer()

middleware
    .use(userMiddleware)
    .use(userMessageTypesMiddleware)