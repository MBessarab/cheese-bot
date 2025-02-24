import {query} from "../../../../../persistence/index.mjs";

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
