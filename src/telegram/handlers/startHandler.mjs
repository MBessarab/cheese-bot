import {userProfileMenu} from "../menu/userProfileMenu.mjs";
import {findUserByCustomUsername} from "../../persistence/user.mjs";
import {createRelation} from "../../persistence/relation.mjs";

export const startHandler = async (ctx) => {
    const companionUsername = ctx.match

    companionUsername ?
        await openUserProfile(ctx, companionUsername) :
        await openCommonState(ctx)
}

// привязать пользователя к диалогу
// открыть профиль партнера
const openUserProfile = async (ctx, companionUsername) => {
    const companion = await findUserByCustomUsername(companionUsername)

    companion ?
        await ctx
            .reply(companion.greeting_message, {
                reply_markup: userProfileMenu
            })
            .then(() => ctx.session)
            .then((session) => session.current_companion_id = companion.user_id)
            .then(() => createRelation(ctx.user, companion))
        :
        await ctx.reply("Пользователь не найден")
            .then(() => {
                ctx.reply("Воспользуйтесь подсказкой /help")
            })
}

const openCommonState = async (ctx) => {
    await openUserProfile(ctx, "maks_1")

    // await ctx.reply(helloMsg, {
    //     reply_markup: menu
    // })
}