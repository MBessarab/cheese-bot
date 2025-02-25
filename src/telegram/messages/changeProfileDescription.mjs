import {updateUserWithProfile} from "./persistence.mjs";
import {profileDescriptionMenu} from "../menu/profile/profileMenu/profileDescriptionMenu/index.mjs";

export async function changeProfileDescription(ctx){
    if(ctx.message.photo) {
        await updateUserWithProfile(ctx.user.id, ctx.message.caption, ctx.message.photo[0].file_id)

        await ctx.replyWithPhoto(ctx.message.photo[0].file_id, {
            caption: ctx.message.caption,
            reply_markup: profileDescriptionMenu
        })
    } else if (ctx.message.text) {
        await updateUserWithProfile(ctx.user.id, ctx.message.text)

        await ctx.reply(ctx.message.text, {
            reply_markup: profileDescriptionMenu
        })
    } else {
        await ctx.reply("Напишите текст или прикрепите фото с описанием.")
    }
}