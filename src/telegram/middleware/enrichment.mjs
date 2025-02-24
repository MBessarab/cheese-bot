import {Composer} from "grammy"
import {getUserMessageTypes} from "../common/persistence/index.mjs";
import {createDefaultUserMessageTypes, getOrCreateUser} from "./persistence.mjs";

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