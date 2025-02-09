import {Menu} from "@grammyjs/menu";
import {backBtnMsg} from "../constants.mjs";


export const userProfileMenu = new Menu('open_request_conversation')
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText("Выбрать, кому написать:")
    })
