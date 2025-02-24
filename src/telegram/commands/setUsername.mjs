import {helloMsg} from "../common/constants.mjs"

export const setUsername = async (ctx) => {
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