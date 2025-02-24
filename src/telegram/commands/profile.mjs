import {helloMsg} from "../common/constants.mjs"
import {mainMenu} from "../menu/mainMenu/index.mjs"

export const profile = async (ctx) => {
    await ctx.reply(helloMsg, {
        reply_markup: mainMenu
    })
}
