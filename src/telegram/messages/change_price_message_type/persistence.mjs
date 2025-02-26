import {query} from "../../../persistence/index.mjs";

export async function updateUserMessageTypeWithPriceStars(userId, priceStars, messageTypeId) {
    return await query(
        `UPDATE user_message_type SET price_stars = $1, last_update_time = $2 WHERE user_id = $3 AND message_type_id = $4`,
        [priceStars, new Date(), userId, messageTypeId],
    )
}