import {companionProfileMenu} from "../menu/companionProfileMenu.mjs"
import {findUserByCustomUsername} from "../../persistence/user.mjs"
import {createRelation} from "../../persistence/relation.mjs"
import {setSessionAttribute} from "../session/index.mjs"

export const start = async (ctx) => {
    const companionUsername = ctx.match

    companionUsername ?
        await openCompanionProfile(ctx, companionUsername) :
        await openCommonState(ctx)
}

const openProfile = async (ctx, companion) => {
    // привязать партнера к диалогу и очистить чат мод
    await setSessionAttribute(ctx, {chat_mode: null, companion_candidate: companion})

    // связать инициатора с компаньоном
    await createRelation(ctx.user, companion)

    // Убрать закреп предыдущего компаньона
    await ctx.unpinAllChatMessages()

    await ctx.reply(companion.greeting_message, {
        reply_markup: companionProfileMenu
    })
}

const companionNotFound = async (ctx) => {
    await ctx.reply("Пользователь не найден")
    await ctx.reply("Воспользуйтесь подсказкой /help")
}

const openCompanionProfile = async (ctx, companionUsername) => {
    const companion = await findUserByCustomUsername(companionUsername)
    companion ? await openProfile(ctx, companion) : await companionNotFound(ctx)
}

const openCommonState = async (ctx) => {
    // Для тестов ?start=maks_1
    await openCompanionProfile(ctx, "maks_1")

    // await ctx.reply(helloMsg, {
    //     reply_markup: mainMenu
    // })
}