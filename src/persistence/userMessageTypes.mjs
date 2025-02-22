import {query} from "./index.mjs"

export async function createDefaultUserMessageTypes(user) {
    const now = new Date()
    const defaultTypeId = 1

    return await query(
        `INSERT INTO user_message_type(user_id, message_type_id, last_update_time) 
        VALUES ($1, $2, $3)
        ON CONFLICT(user_id, message_type_id) DO NOTHING`,
        [user.id, defaultTypeId, now]
    )
}

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

export async function getAllMessageTypes() {
    const result = await query(
        `SELECT * FROM message_type`
    )

    return result.rows
}
