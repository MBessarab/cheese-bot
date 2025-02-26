// Удалить закрепленное сообщение от бота
import {isUser} from "./filter.mjs";

export const deletePinMessageAlert =  async (ctx) => {
    if(!isUser(ctx) && ctx.msg.pinned_message) {
        setTimeout(async () => await ctx.deleteMessage(), 3500)

        return false
    } else {
        return true
    }
}
