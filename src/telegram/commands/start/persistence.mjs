import {query} from "../../../persistence/index.mjs"

export async function findUserByNickname(nickname) {
    const result = await query(`SELECT * FROM users WHERE nickname = $1`, [nickname])

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
