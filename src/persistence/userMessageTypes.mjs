import {query} from "./index.mjs"
import {findRelation} from "./relation.mjs";

export async function createDefaultUserMessageTypes(user) {
    const now = new Date()
    const defaultTypeId = 1

    return await query(
        `INSERT INTO user_type_message(user_id, type_message_id, last_update_time) 
        VALUES ($1, $2, $3)
        ON CONFLICT(user_id, type_message_id) DO NOTHING`,
        [user.id, defaultTypeId, now]
    )
}

export async function getUserTypesMessage(user) {
    const result = await query(
        `SELECT tm.*, utm.price_stars
        FROM 
            user_type_message utm INNER JOIN type_message tm 
                ON utm.type_message_id = tm.id 
        WHERE 
            utm.user_id = $1`,
        [user.id]
    )

    return result.rows
}

export async function findTypeMessageById(id) {
    const result = await query(
        `SELECT * 
        FROM type_message 
        WHERE id = $1
        `,
        [id]
    )

    return result.rows[0]
}
