import {logging} from "../../persistence/log.mjs";


export async function logActions(ctx, next) {
    await logging(ctx)

    return await next()
}