import {helloMsg} from "../constants.mjs";
import {menu} from "../menu/index.mjs";

export const setUsernameHandler = async (ctx) => {
    // const companionUsername = ctx.match
    //
    // if (companionUsername) {
    //     // привязать пользователя к диалогу
    //     // открыть профиль партнера
    //     await openUserProfile(partnerUsername)
    // } else {
    //     await openCommonState()
    // }

    await ctx.reply(helloMsg, {
        reply_markup: menu
    })
}