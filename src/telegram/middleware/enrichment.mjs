import {Composer} from "grammy";
import {getOrCreateUser} from "../../persistence/user.mjs";


export async function userMiddleware(ctx, next) {
    ctx.user = await getOrCreateUser(ctx.from)

    return await next()
}
// middleware для обогащения контекста
export const middleware = new Composer()
    .use(userMiddleware)
