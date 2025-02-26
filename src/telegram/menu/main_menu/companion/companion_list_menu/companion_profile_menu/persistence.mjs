import {query} from "../../../../../../persistence/index.mjs"

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

export async function findUserMessageTypesPrice(user) {
    const result = await query(
        `SELECT tm.*, utm.price_stars
        FROM 
            user_message_type utm INNER JOIN message_type tm 
                ON utm.message_type_id = tm.id 
        WHERE 
            utm.user_id = $1 
            AND utm.active = true`,
        [user.id]
    )

    return result.rows
}
