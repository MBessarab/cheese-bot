import {query} from "./index.mjs";

export async function getOrCreateUser(user) {
    const now = new Date()

    const promise = await query(
        'INSERT INTO users(user_id, first_name, username, language_code, last_active_time, create_time, last_update_time) ' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7) ' +
        'ON CONFLICT(user_id) DO UPDATE SET first_name = $8, username = $9, last_update_time = $10, last_active_time = $11 ' +
        'RETURNING * ;',
        [
            // insert part
            user.id, user.first_name, user.username, user.language_code, now, now, now,
            // update part
            user.first_name, user.username, now, now
        ]
    )

    return promise.rows[0]
}

export async function findUsersByIds(ids) {
    const promise = await query('SELECT * FROM users')
    return promise.rows.filter((user) => ids.includes(user.user_id))
}

export async function findUserByCustomUsername(customUsername) {
    const promise = await query('SELECT * FROM users WHERE custom_username = $1', [customUsername])
    return promise.rows[0]
}