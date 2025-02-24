import {query} from "../../../persistence/index.mjs";

export async function getUserMessageTypes(user) {
    const result = await query(
        `SELECT tm.*, utm.price_stars
        FROM 
            user_message_type utm INNER JOIN message_type tm 
                ON utm.message_type_id = tm.id 
        WHERE 
            utm.user_id = $1`,
        [user.id]
    )

    return result.rows
}

export async function findRelation(initiator, companion) {
    const result = await query(
        `SELECT * 
            FROM 
                relation 
            WHERE 
                initiator_user_id = $1
                AND companion_user_id = $2
            `, [initiator.id, companion.id])

    return result.rows[0]
}


export async function findAllNonAnsweredMessages(companion) {
    const result = await query(
        `SELECT *
        FROM messages
        WHERE
            companion_user_id = $1 
            AND message_id NOT IN (
                SELECT 
                    reply_message_id 
                FROM messages 
                WHERE reply_message_id IS NOT NULL
            ) 
            AND reply_message_id IS NULL 
        ORDER BY create_time ASC `,
        [companion.id]
    )

    return result.rows
}

export async function findAllNonAnsweredMessage(companion) {
    const result = await query(
        "SELECT * " +
        "FROM messages " +
        "WHERE " +
        "companion_user_id = $1 " +
        "AND message_id NOT IN (SELECT reply_message_id FROM messages WHERE reply_message_id IS NOT NULL) " +
        "AND reply_message_id IS NULL " +
        "ORDER BY create_time ASC LIMIT 1",
        [companion.id]
    )

    return result.rows[0]
}
