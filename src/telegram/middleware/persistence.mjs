import {query} from "../../persistence/index.mjs"

export async function createDefaultUserMessageTypes(user) {
    const now = new Date()
    const defaultTypeId = 1

    return await query(
        `INSERT INTO user_message_type(user_id, message_type_id, last_update_time) 
        VALUES ($1, $2, $3)
        ON CONFLICT(user_id, message_type_id) DO NOTHING`,
        [user.id, defaultTypeId, now]
    )
}

export async function logging(ctx) {
    return ctx.msg && await query(
        `INSERT INTO bot_logs(
            user_id, username, is_bot, message_id, date, text, reply_markup, voice, video_note, photo, video, sticker
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
            ctx.from.id, ctx.from.username, ctx.from.is_bot, ctx.msg.message_id, new Date(ctx.msg.date * 1000), ctx.msg.text,
            JSON.stringify(ctx.msg.reply_markup), JSON.stringify(ctx.msg.voice), JSON.stringify(ctx.msg.video_note),
            JSON.stringify(ctx.msg.photo), JSON.stringify(ctx.msg.video), JSON.stringify(ctx.msg.sticker)
        ]
    )
}

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