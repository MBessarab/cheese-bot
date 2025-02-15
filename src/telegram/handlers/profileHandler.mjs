import {helloMsg} from "../constants.mjs"
import {mainMenu} from "../menu/mainMenu.mjs"

export const profileHandler = async (ctx) => {
    await ctx.reply(helloMsg, {
        reply_markup: mainMenu
    })
}
