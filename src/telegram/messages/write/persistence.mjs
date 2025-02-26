import {query} from "../../../persistence/index.mjs";

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