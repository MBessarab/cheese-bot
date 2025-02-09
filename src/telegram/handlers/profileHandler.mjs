import {helloMsg} from "../constants.mjs";
import {menu} from "../menu/index.mjs";

export const profileHandler = async (ctx) => {
    await ctx.reply(helloMsg, {
        reply_markup: menu
    })
}
