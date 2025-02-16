import {helloMsg} from "../constants.mjs"
import {mainMenu} from "../menu/mainMenu.mjs"

export const profile = async (ctx) => {
    await ctx.reply(helloMsg, {
        reply_markup: mainMenu
    })
}
