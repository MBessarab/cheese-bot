import {setNickname} from "./persistence.mjs"
import {profileMenu} from "../menu/profile/profileMenu/index.mjs"

export const changeNickname = async (ctx) => {
    await setNickname(ctx.user.id, ctx.msg.text)

    await ctx.reply("changeNickname", {
        reply_markup: profileMenu
    })
}