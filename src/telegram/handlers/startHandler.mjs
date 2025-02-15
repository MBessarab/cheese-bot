import {companionProfileMenu} from "../menu/companionProfileMenu.mjs"
import {findUserByCustomUsername} from "../../persistence/user.mjs"
import {createRelation} from "../../persistence/relation.mjs"

export const startHandler = async (ctx) => {
    const companionUsername = ctx.match

    companionUsername ?
        await openCompanionProfile(ctx, companionUsername) :
        await openCommonState(ctx)
}

const openCompanionProfile = async (ctx, companionUsername) => {
    const companion = await findUserByCustomUsername(companionUsername)

    companion ?
        await ctx.session
            // привязать партнера к диалогу
            .then((session) => session.companion_candidate = companion)
            .then(() => createRelation(ctx.user, companion))
            // Показать приветствие
            .then(() => ctx.reply(companion.greeting_message, {
                reply_markup: companionProfileMenu
            }))
        :
        await ctx.reply("Пользователь не найден")
            .then(async () =>  {
                await ctx.reply("Воспользуйтесь подсказкой /help")
            })
}

const openCommonState = async (ctx) => {
    // Для тестов ?start=maks_1
    await openCompanionProfile(ctx, "maks_1")

    // await ctx.reply(helloMsg, {
    //     reply_markup: mainMenu
    // })
}