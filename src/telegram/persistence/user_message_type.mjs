import {query} from "../../persistence/index.mjs";

export async function createDefaultUserMessageTypes(user) {
    return await query(
        `INSERT INTO user_message_type(user_id, message_type_id, last_update_time)
            SELECT 
                $1 as user_id, 
                mt.id, 
                $2 as last_update_time 
            FROM 
                message_type as mt
        ON CONFLICT(user_id, message_type_id) DO NOTHING`,
        [user.id, new Date()]
    )
}

export async function getUserMessageTypes(user) {
    const result = await query(
        `SELECT tm.*, utm.price_stars, utm.active
        FROM 
            user_message_type utm INNER JOIN message_type tm 
                ON utm.message_type_id = tm.id 
        WHERE 
            utm.user_id = $1`,
        [user.id]
    )

    return result.rows
}

export async function findUserMessageTypes(userId) {
    const result = await query(
        `SELECT * FROM user_message_type WHERE user_id = $1`,
        [userId]
    )

    return result.rows
}

export async function findActiveUserMessageTypesPrice(user) {
    const result = await query(
        `SELECT tm.*, utm.price_stars
        FROM 
            user_message_type utm INNER JOIN message_type tm 
                ON utm.message_type_id = tm.id 
        WHERE 
            utm.user_id = $1 
            AND utm.active = true`,
        [user.id]
    )

    return result.rows
}

export async function changeActiveUserMessageType(userId, messageTypeId, active) {
    return await query(
        `UPDATE user_message_type SET active = $1
        WHERE user_id = $2 AND message_type_id = $3`, [active, userId, messageTypeId])
}

export async function getMessageTypeById(userId, messageTypeId) {
    const result =  await query(
        `SELECT * 
         FROM user_message_type 
         WHERE user_id = $1 AND message_type_id = $2`,
        [userId, messageTypeId]
    )

    return result.rows[0]
}

export async function updateUserMessageTypeWithPriceStars(userId, priceStars, messageTypeId) {
    return await query(
        `UPDATE user_message_type SET price_stars = $1, last_update_time = $2 WHERE user_id = $3 AND message_type_id = $4`,
        [priceStars, new Date(), userId, messageTypeId],
    )
}

export async function findTypeMessageByShort(short) {
    const result = await query(
        `SELECT * FROM message_type WHERE short = $1`, [short]
    )

    return result.rows[0]
}

export async function findTypeMessageById(id) {
    const result = await query(`SELECT * FROM message_type WHERE id = $1`, [id])

    return result.rows[0]
}
