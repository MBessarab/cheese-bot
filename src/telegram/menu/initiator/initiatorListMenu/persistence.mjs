import {query} from "../../../../persistence/index.mjs"

export async function findUsersByIds(ids) {
    const result = await query(
        `SELECT * FROM users`
    )

    return result.rows.filter(user => ids.includes(user.id))
}

export async function countNonAnsweredMessages(companion) {
    const result = await query(
        `SELECT 
            initiator_user_id, 
            count(*) as count 
        FROM 
            messages 
        WHERE 
            companion_user_id = $1 
            AND message_id NOT IN (
                SELECT 
                    reply_message_id 
                FROM 
                    messages 
                WHERE 
                    reply_message_id IS NOT NULL
            ) 
            AND reply_message_id IS NULL 
        GROUP BY initiator_user_id`,
        [companion.id]
    )

    return result.rows
}
