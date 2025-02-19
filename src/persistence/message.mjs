import {query} from "./index.mjs"

export async function findAllNonAnsweredMessage(companion) {
    const promise = await query(
        "SELECT * " +
        "FROM messages " +
        "WHERE " +
        "companion_user_id = $1 " +
        "AND message_id NOT IN (SELECT reply_message_id FROM messages WHERE reply_message_id IS NOT NULL) " +
        "AND reply_message_id IS NULL " +
        "ORDER BY create_time ASC LIMIT 1",
        [companion.user_id]
    )

    return promise.rows[0]
}

export async function findInitiatorNonAnsweredMessage(companion, initiator) {
    const promise = await query(
        "SELECT * " +
        "FROM messages " +
        "WHERE " +
        "companion_user_id = $1 " +
        "AND initiator_user_id = $2 " +
        "AND message_id NOT IN (SELECT reply_message_id FROM messages WHERE reply_message_id IS NOT NULL) " +
        "AND reply_message_id IS NULL " +
        "ORDER BY create_time ASC LIMIT 1",
        [companion.user_id, initiator.user_id]
    )

    return promise.rows[0]
}

export async function countNonAnsweredMessages(companion) {
    const promise = await query(
        "SELECT " +
        "initiator_user_id, " +
        "count(*) as count " +
        "FROM messages " +
        "WHERE " +
        "companion_user_id = $1 " +
        "AND message_id NOT IN (SELECT reply_message_id FROM messages WHERE reply_message_id IS NOT NULL) " +
        "AND reply_message_id IS NULL " +
        "GROUP BY initiator_user_id",
        [companion.user_id]
    )

    return promise.rows
}

export async function findMessageById(message_id) {
    const promise = await query(
        "SELECT messages.*, users.chat_id " +
        "FROM messages INNER JOIN users ON messages.initiator_user_id = users.user_id " +
        "WHERE " +
        "messages.message_id = $1 " +
        "AND message_id NOT IN (SELECT reply_message_id FROM messages WHERE reply_message_id IS NOT NULL) " +
        "AND reply_message_id IS NULL ",
        [message_id]
    )

    return promise.rows[0]
}

export async function saveInitiatorMessage(msg, companionUser){
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

export async function saveCompanionMessage(msg, initiatorUserId, replyMessageId){
    return await query(
        'INSERT INTO messages(' +
            'message_id, initiator_user_id, companion_user_id, reply_message_id, text, voice_file_id, video_note_file_id, create_time' +
        ') VALUES (' +
            '$1, $2, $3, $4, $5, $6, $7, $8' +
        ') ',
        [
            msg.message_id, initiatorUserId, msg.from.id, replyMessageId, msg?.text,
            msg.voice?.file_id, msg.video_note?.file_id, new Date()
        ]
    )
}
