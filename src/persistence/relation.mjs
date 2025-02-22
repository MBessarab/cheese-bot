import {query} from "./index.mjs"

export async function findRelationsFromUser(user) {
    const result = await query(
        `SELECT * 
            FROM relation 
            WHERE initiator_user_id = $1
            `,
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

export async function createRelation(initiatorUser, companionUser) {
    const now = new Date()

    return await query(
        `INSERT INTO relation(initiator_user_id, companion_user_id, create_time) VALUES ($1, $2, $3) 
                ON CONFLICT(initiator_user_id, companion_user_id) DO NOTHING `,
        [
            initiatorUser.id, companionUser.id, now
        ]
    )
}

export async function updateRelationTypeMessages(initiator, companion, messageType, checked) {
    return await query(
        `UPDATE relation 
            SET reply_message_type_id = $1
            WHERE 
                initiator_user_id = $2 AND companion_user_id = $3
            `,
        [checked ? messageType.id : null, initiator.id, companion.id]
    )
}
