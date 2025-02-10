import {query} from "./index.mjs";

export async function findRelationsFromUser(user) {
    const promise = await query('SELECT * FROM relation WHERE initiator_user_id = $1', [user.user_id])
    return promise.rows
}

export async function createRelation(initiatorUser, companionUser) {
    const now = new Date()

    return await query(
        'INSERT INTO relation(initiator_user_id, companion_user_id, create_time) VALUES ($1, $2, $3) ' +
        'ON CONFLICT(initiator_user_id, companion_user_id) DO NOTHING ;',
        [
            initiatorUser.user_id, companionUser.user_id, now
        ]
    )
}

