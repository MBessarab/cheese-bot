import {companionProfileMenu} from "../menu/companionProfileMenu.mjs"
import {findUserByCustomUsername} from "../../persistence/user.mjs"
import {createRelation} from "../../persistence/relation.mjs"

export const start = async (ctx) => {
    const companionUsername = ctx.match

    companionUsername ?
        await openCompanionProfile(ctx, companionUsername) :
        await openCommonState(ctx)
}

const openProfile = async (ctx, companion) => {
    const session = await ctx.session
    // привязать партнера к диалогу и очистить чат мод
    session.companion_candidate = companion
    session.chat_mode = null

    // связать инициатора с компаньоном
    await createRelation(ctx.user, companion)

    // Убрать закреп предыдущего компаньона
    const unpinned = await ctx.unpinAllChatMessages()

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