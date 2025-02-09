import {query} from "./index.mjs";

export async function findRelationsFromUser(user) {
    const promise = await query('SELECT * FROM relation WHERE requester_user_id = $1', [user.user_id])
    return promise.rows
}

export async function createRelation(requesterUser, responderUser) {
    const now = new Date()

    return await query(
        'INSERT INTO relation(requester_user_id, responder_user_id, create_time) VALUES ($1, $2, $3) ' +
        'ON CONFLICT(requester_user_id, responder_user_id) DO NOTHING ;',
        [
            requesterUser.user_id, responderUser.user_id, now
        ]
    )
}

