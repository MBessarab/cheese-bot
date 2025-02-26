import {query} from "../../../persistence/index.mjs";

export async function updateUserWithProfile(userId, description, photo) {
    return await query(
        `UPDATE users SET photo = $1, description = $2 WHERE id = $3`,
        [photo, description, userId]
    )
}