import {query} from "../../../../../../../persistence/index.mjs"

export async function changeActiveUserMessageType(userId, messageTypeId, active) {
    return await query(
        `UPDATE user_message_type SET active = $1
        WHERE user_id = $2 AND message_type_id = $3`, [active, userId, messageTypeId])
}

export async function getMessageTypeById(userId, messageTypeId) {
    const result =  await query(
        `SELECT * 
         FROM user_message_type 
         WHERE user_id = $1 AND message_type_id = $2`,
        [userId, messageTypeId]
    )

    return result.rows[0]
}