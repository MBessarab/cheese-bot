import {query} from "./index.mjs"

export async function getOrCreateUser(user, chatId) {
    const now = new Date()

    const result = await query(
        `INSERT INTO users(
            id, chat_id, first_name, username, language_code, last_active_time, create_time, last_update_time
        ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        ON CONFLICT(id) DO UPDATE SET chat_id = $9, first_name = $10, username = $11, last_update_time = $12, last_active_time = $13 
        RETURNING * `,
        [
            // insert part
            user.id, chatId, user.first_name, user.username, user.language_code, now, now, now,
            // update part
            chatId, user.first_name, user.username, now, now
        ]
    )

    return result.rows[0]
}

export async function findUsersByIds(ids) {
    const result = await query(
        `SELECT * FROM users`
    )

    return result.rows.filter(user => ids.includes(user.id))
}

export async function findUsersById(id) {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [id])

    return result.rows[0]
}

export async function findUserByCustomUsername(customUsername) {
    const result = await query(`SELECT * FROM users WHERE custom_username = $1`, [customUsername])

    return result.rows[0]
}