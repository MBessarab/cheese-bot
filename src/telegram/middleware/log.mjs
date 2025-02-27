import {logging} from "../persistence/log.mjs";

export async function logActions(ctx) {
    await logging(ctx)
}