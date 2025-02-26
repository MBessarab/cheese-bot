import {query} from "../../../persistence/index.mjs";

export async function setNickname(userId, nickname) {
    return await query(
        `UPDATE users SET nickname = $1, last_update_time = $2 WHERE id = $3`,
        [nickname, new Date(), userId]
    )
}
