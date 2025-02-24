import {query} from "../../../../../../persistence/index.mjs"

export async function deleteUserMessageType(userId, messageTypeId) {
    return await query(
        `DELETE FROM user_message_type 
        WHERE user_id = $1 AND message_type_id = $2`, [userId, messageTypeId])
}

export async function addUserMessageType(userId, messageTypeId) {
    return await query(
        `INSERT INTO user_message_type(user_id, message_type_id, last_update_time)
         VALUES ($1, $2, $3)`, [userId, messageTypeId, new Date()])
}

export async function findUserMessageType(userId, messageTypeId) {
    const result =  await query(
        `SELECT * 
            FROM user_message_type 
            WHERE user_id = $1 AND message_type_id = $2`,
        [userId, messageTypeId]
    )

    return result.rows[0]
}