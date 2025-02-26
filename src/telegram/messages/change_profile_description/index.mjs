import {updateUserWithProfile} from "./persistence.mjs";
import {profileMenu} from "../../menu/main_menu/profile/profile_menu/index.mjs";

export async function changeProfileDescription(ctx){
    if(ctx.message.photo) {
        await updateUserWithProfile(ctx.user.id, ctx.message.caption, ctx.message.photo[0].file_id)

        const messageText = `Никнейм: <b>${ctx.user.nickname || ctx.user.username}</b>` +
            `\n\n${ctx.message.caption || 'Описание отсутствует'}` +
            `\n\nБаланс: ${ctx.user.balance_stars}`

        await ctx.replyWithPhoto(ctx.message.photo[0].file_id, {
            caption: messageText,
            reply_markup: profileMenu
        })
    } else if (ctx.message.text) {
        await updateUserWithProfile(ctx.user.id, ctx.message.text)

        const messageText = `Никнейм: <b>${ctx.user.nickname || ctx.user.username}</b>` +
            `\n\n${ctx.message.text || 'Описание отсутствует'}` +
            `\n\nБаланс: ${ctx.user.balance_stars}`

        await ctx.reply(messageText, {
            reply_markup: profileMenu
        })
    } else {
        await ctx.reply("Напишите текст или прикрепите фото с описанием.")
    }
}