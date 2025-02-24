import {query} from "../../persistence/index.mjs";

export async function findMessageById(message_id) {
    const result = await query(
        `SELECT 
            messages.*, 
            users.chat_id
        FROM 
            messages INNER JOIN users ON messages.initiator_user_id = users.id
        WHERE
            messages.message_id = ${message_id} 
            AND message_id NOT IN (
                SELECT 
                    reply_message_id 
                FROM 
                    messages 
                WHERE 
                    reply_message_id IS NOT NULL
            )
            AND reply_message_id IS NULL `
    )

    return result.rows[0]
}

export async function findInitiatorNonAnsweredMessage(companion, initiatorUserId) {
    const result = await query(
        `SELECT * 
        FROM messages 
        WHERE 
            companion_user_id = $1 
            AND initiator_user_id = $2 
            AND message_id NOT IN (
                SELECT reply_message_id 
                FROM messages 
                WHERE reply_message_id IS NOT NULL
            ) 
            AND reply_message_id IS NULL 
        ORDER BY create_time ASC 
        LIMIT 1`,
        [companion.id, initiatorUserId]
    )

    return result.rows[0]
}

export async function saveInitiatorMessage(msg, companionUser, messageTypeId, cost){
    return await query(
        `INSERT INTO messages(
            message_id, initiator_user_id, companion_user_id, need_reply_message_type_id, cost, text, voice_file_id, video_note_file_id, create_time
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) `,
        [
            msg.message_id, msg.from.id, companionUser.id, messageTypeId, cost, msg?.text, msg.voice?.file_id,
            msg.video_note?.file_id, new Date()
        ]
    )
}

export async function saveCompanionMessage(msg, initiatorUserId, replyMessageId){
    return await query(
        `INSERT INTO messages(
            message_id, initiator_user_id, companion_user_id, reply_message_id, text, voice_file_id, 
            video_note_file_id, create_time
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) `,
        [
            msg.message_id, initiatorUserId, msg.from.id, replyMessageId, msg?.text,
            msg.voice?.file_id, msg.video_note?.file_id, new Date()
        ]
    )
}

export async function findTypeMessageByShort(short) {
    const result = await query(
        `SELECT * 
        FROM message_type 
        WHERE short = $1
        `,
        [short]
    )

    return result.rows[0]
}

export async function findTypeMessageById(id) {
    const result = await query(
        `SELECT * 
        FROM message_type 
        WHERE id = $1
        `,
        [id]
    )

    return result.rows[0]
}

export async function findUsersById(id) {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [id])

    return result.rows[0]
}