import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {setSessionAttribute} from "../../../../../common/session/index.mjs"
import {profileMenu} from "../index.mjs"

///////////////////////////// Middleware /////////////////////////////

export async function changeProfileDescriptionMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: 'change_profile_description' })

    await ctx.deleteMessage()

    await ctx.api.sendMessage(ctx.user.chat_id, 'Напишите приветственное сообщение с фото или без.', {
        reply_markup: changeProfileDescriptionMenu
    })
}

async function backMiddleware(ctx) {
    await setSessionAttribute(ctx, { chat_mode: null })

    const messageText = `Никнейм: <b>${ctx.user.nickname || ctx.user.username}</b>` +
        `\n\n${ctx.user.description || 'Описание отсутствует'}` +
        `\n\nБаланс: ${ctx.user.balance_stars}`

    if(ctx.user.photo) {
        await ctx.editMessageMedia({
            type: "photo",
            caption: messageText,
            media: ctx.user.photo
        }, {
            reply_markup: profileMenu
        })
    } else {
        await ctx.reply(messageText,{
            reply_markup: profileMenu
        })
    }
}

//////////////////////////////// Menu ///////////////////////////////

export const changeProfileDescriptionMenu = new Menu('change_profile_description_menu')
    .text(backBtnMsg, backMiddleware)