import {query} from "../../persistence/index.mjs";

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

export async function updateUserWithProfile(userId, description, photo) {
    return await query(
        `UPDATE users SET photo = $1, description = $2 WHERE id = $3`,
        [photo, description, userId]
    )
}

export async function setNickname(userId, nickname) {
    return await query(
        `UPDATE users SET nickname = $1, last_update_time = $2 WHERE id = $3`,
        [nickname, new Date(), userId]
    )
}

export async function findUserByNickname(nickname) {
    const result = await query(`SELECT * FROM users WHERE nickname = $1`, [nickname])

    return result.rows[0]
}

export async function findUsersByIds(ids) {
    const result = await query(`SELECT * FROM users`)

    return result.rows.filter(user => ids.includes(user.id))
}

export async function findUsersById(id) {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [id])

    return result.rows[0]
}
