import {query} from "./index.mjs";

export async function getOrCreateUser(user) {
    const now = new Date()

    const userDb = await query(
        'INSERT INTO users(user_id, first_name, username, language_code, last_active_time, create_time) ' +
        'VALUES ($1, $2, $3, $4, $5, $6) ' +
        'ON CONFLICT(user_id) DO UPDATE SET first_name = $7, username = $8, last_update_time = $9, last_active_time = $10 ' +
        'RETURNING * ;',
        [
            // insert part
            user.id, user.first_name, user.username, user.language_code, now, now,
            // update part
            user.first_name, user.username, now, now
        ]
    )

    console.log(new Date().getMilliseconds() - now.getMilliseconds())
    return userDb.rows[0]
}