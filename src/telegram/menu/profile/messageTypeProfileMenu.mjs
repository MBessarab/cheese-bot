import {Menu} from "@grammyjs/menu";
import {backBtnMsg} from "../../constants.mjs";

///////////////////////////// Middleware /////////////////////////////

export async function messageTypeProfileMiddleware(ctx) {

}

async function enableMessageTypeMiddleware(ctx, next) {


    return await next()
}

async function backMiddleware(ctx, next) {

    return await next()
}

//////////////////////////////// Menu ///////////////////////////////

export const messageTypeProfileMenu = new Menu('message_type_profile_menu')
    .dynamic(async (ctx, range) => {

        range
            .text(
                `✅ || ❌`,
                enableMessageTypeMiddleware
            )
            .row()
            .text(
                `Стоимость ⭐️`,
                enableMessageTypeMiddleware
            )
            .row()

        return range
    })
    .back(backBtnMsg, backMiddleware)