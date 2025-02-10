import {Menu} from "@grammyjs/menu";
import {backBtnMsg} from "../constants.mjs";


export const companionProfileMenu = new Menu('companion_profile_menu')
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText("Выбрать, кому написать:")
    })
