import {helloMsg} from "../common/constants.mjs"
import {mainMenu} from "../menu/main_menu/index.mjs"

export const profile = async (ctx) => {
    await ctx.reply(helloMsg, {
        reply_markup: mainMenu
    })
}
