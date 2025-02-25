import {Menu} from "@grammyjs/menu"
import {backBtnMsg} from "../../../../common/constants.mjs"
import {changeProfileDescriptionMenu, changeProfileDescriptionMiddleware} from "./changeProfileDescriptionMenu/index.mjs"
import {profileMenu} from "../index.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function showDescriptionProfileMiddleware(ctx, next) {
    if(ctx.user.photo) {
        await ctx.editMessageMedia({
            type: "photo",
            caption: ctx.user.description || 'Описание отсутствует',
            media: ctx.user.photo
        })
    } else {
        await ctx.editMessageText(ctx.user.description || 'Описание отсутствует')
    }

    return await next()
}

async function backMiddleware(ctx) {
    await ctx.deleteMessage()

    await ctx.api.sendMessage(
        ctx.user.chat_id,
        `Никнейм: <b>${ctx.user.nickname || ctx.user.username}</b>\nБаланс: ${ctx.user.balance_stars} ⭐️\n`, {
            parse_mode: "HTML",
            reply_markup: profileMenu
        }
    )
}

//////////////////////////////// Menu ///////////////////////////////

export const profileDescriptionMenu = new Menu("show_profile_description_menu")
    .dynamic((ctx, range) => {
        return range
            .text(
                'Изменить',
                changeProfileDescriptionMiddleware
            )
            .row()
    })
    .text(backBtnMsg, backMiddleware)


profileDescriptionMenu.register([changeProfileDescriptionMenu])
