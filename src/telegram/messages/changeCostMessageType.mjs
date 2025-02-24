import {
    messageTypeProfileMenu
} from "../menu/profile/profileMenu/messageTypesProfileMenu/messageTypeProfileMenu/index.mjs"
import {updateUserMessageTypeWithPriceStars} from "./persistence.mjs"
import {getSessionAttribute} from "../common/session/index.mjs"

export const changePriceMessageTypeHandler = async (ctx) => {
    const messageType = await getSessionAttribute(ctx, "profile_message_type")
    await updateUserMessageTypeWithPriceStars(ctx.user.id, ctx.msg.text, messageType.id)

    await ctx.reply("1", {
        reply_markup: messageTypeProfileMenu
    })
}