import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../../common/constants.mjs"
import {setSessionAttribute} from "../../../../../common/session/index.mjs"
import {profileDescriptionMenu} from "../index.mjs";

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

    if(ctx.user.photo) {
        await ctx.editMessageMedia({
            type: "photo",
            caption: ctx.user.description || 'Описание отсутствует',
            media: ctx.user.photo
        }, {
            reply_markup: profileDescriptionMenu
        })
    } else {
        await ctx.reply(ctx.user.description || 'Описание отсутствует',{
            reply_markup: profileDescriptionMenu
        })
    }

}

//////////////////////////////// Menu ///////////////////////////////

export const changeProfileDescriptionMenu = new Menu('change_profile_description_menu')
    .text(backBtnMsg, backMiddleware)