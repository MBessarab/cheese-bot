import {query} from "./index.mjs"

export async function findNonAnsweredMessage(companion) {
    const promise = await query(
        "SELECT * FROM messages WHERE companion_user_id = $1 AND NOT answered ORDER BY create_time ASC LIMIT 1",
        [companion.user_id]
    )

    return promise.rows
}

export async function countNonAnsweredMessages(companion) {
    const promise = await query(
        "SELECT initiator_user_id, count(*) as count FROM messages WHERE companion_user_id = $1 AND NOT answered GROUP BY initiator_user_id",
        [companion.user_id]
    )

    return promise.rows
}
