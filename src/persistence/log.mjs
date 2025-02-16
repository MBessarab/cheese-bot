import {query} from "./index.mjs"

export async function logging(ctx) {
    return ctx.msg && await query(
        'INSERT INTO bot_logs(' +
        'user_id, username, is_bot, message_id, date, text, reply_markup, voice, video_note, photo, video, sticker' +
        ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
        [
            ctx.from.id, ctx.from.username, ctx.from.is_bot, ctx.msg.message_id, new Date(ctx.msg.date * 1000), ctx.msg.text,
            JSON.stringify(ctx.msg.reply_markup), JSON.stringify(ctx.msg.voice), JSON.stringify(ctx.msg.video_note),
            JSON.stringify(ctx.msg.photo), JSON.stringify(ctx.msg.video), JSON.stringify(ctx.msg.sticker)
        ]
    )
}
