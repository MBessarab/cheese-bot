import {query} from "./index.mjs"

export async function findNonAnsweredMessage(companion) {
    const promise = await query(
        "SELECT * FROM messages WHERE companion_user_id = $1 AND NOT answered ORDER BY create_time ASC LIMIT 1",
        [companion.user_id]
    )

    return promise.rows
}

export async function findInitiatorNonAnsweredMessage(companion, initiator) {
    const promise = await query(
        "SELECT * FROM messages WHERE companion_user_id = $1 AND initiator_user_id = $2 AND NOT answered ORDER BY create_time ASC LIMIT 1",
        [companion.user_id, initiator.user_id]
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

export async function saveMessage(msg, companionUser){
    return await query(
        'INSERT INTO messages(' +
            'message_id, initiator_user_id, companion_user_id, text, voice_file_id, video_note_file_id, create_time' +
        ') VALUES (' +
            '$1, $2, $3, $4, $5, $6, $7' +
        ') ',
        [
            msg.message_id, msg.from.id, companionUser.user_id, msg?.text, msg.voice?.file_id, msg.video_note?.file_id, new Date()
        ]
    )
}