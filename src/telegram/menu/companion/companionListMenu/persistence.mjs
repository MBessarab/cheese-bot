import {query} from "../../../../persistence/index.mjs";

export async function findRelationsFromUser(user) {
    const result = await query(
        `SELECT * 
            FROM relation 
            WHERE initiator_user_id = $1
            `,
        [user.id]
    )

    return result.rows
}

export async function findUsersByIds(ids) {
    const result = await query(
        `SELECT * FROM users`
    )

    return result.rows.filter(user => ids.includes(user.id))
}
