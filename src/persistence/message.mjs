import {query} from "./index.mjs";

export async function findNonAnsweredMessages(companion) {
    const promise = await query("SELECT * FROM messages WHERE companion_user_id = $1 AND NOT answered ORDER BY create_time DESC", [companion.user_id]);

    return promise.rows
}

export async function findAnsweredMessages(companion) {
    const promise = await query("SELECT * FROM messages WHERE companion_user_id = $1 AND answered ORDER BY create_time DESC", [companion.user_id]);

    return promise.rows
}
