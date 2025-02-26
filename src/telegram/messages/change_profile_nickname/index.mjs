import {profileMenu} from "../../menu/main_menu/profile/profile_menu/index.mjs"
import {setNickname} from "./persistence.mjs";

export const changeNickname = async (ctx) => {
    await setNickname(ctx.user.id, ctx.msg.text)

    const messageText = `Никнейм: <b>${ctx.msg.text}</b>` +
        `\n\n${ctx.user.description || 'Описание отсутствует'}` +
        `\n\nБаланс: ${ctx.user.balance_stars}`

    if(ctx.user.photo) {
        await ctx.api.sendPhoto(ctx.user.chat_id, ctx.user.photo,{
            caption: messageText,
            parse_mode: "HTML",
            reply_markup: profileMenu,
        })
    } else {
        await ctx.reply(messageText, {
            reply_markup: profileMenu,
            parse_mode: "HTML"
        })
    }
}