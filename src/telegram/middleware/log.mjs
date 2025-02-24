import {logging} from "./persistence.mjs";

export async function logActions(ctx, next) {
    await logging(ctx)

    return await next()
}