import {mainMenu} from "../../menu/main_menu/index.mjs";

export const ban = async (ctx) => {
    // проверить наличие причины
    // записать abuse в relation

    await ctx.reply(`ban`, {
        reply_markup: mainMenu
    })

    // очистить текущее сообщение из сессии
    // прислать меню с сообщениями
}
