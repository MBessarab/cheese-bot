import {Composer} from "grammy";
import {getOrCreateUser} from "../../persistence/user.mjs";


async function userMiddleware(ctx, next) {
    ctx.user = await getOrCreateUser(ctx.from)

    await next()
}

export const middleware = new Composer()
    .use(userMiddleware)
