import {Bot} from "grammy";
import 'dotenv/config'
import {
    generateAfterMiddleware,
    generateBeforeMiddleware, generateUpdateMiddleware,
} from "telegraf-middleware-console-time";

import {sessionMiddleware} from "./session/index.mjs";
import { hydrateContext } from "@grammyjs/hydrate";
import {startHandler} from "./handlers/startHandler.mjs";
import {setUsernameHandler} from "./handlers/setUsernameHandler.mjs";
import {profileHandler} from "./handlers/profileHandler.mjs";
import {mainMenu} from "./menu/mainMenu.mjs";
import {emojiParser} from "@grammyjs/emoji";
import {deletePinMessageAlert, filterBotsMiddleware} from "./middleware/filter.mjs";
import {middleware} from "./middleware/enrichment.mjs";
import {writeMessageHandler} from "./handlers/writeMessageHandler.mjs";
import {replyMessageHandler} from "./handlers/replyMessageHandler.mjs";
import {logActions} from "./middleware/log.mjs";

const token = process.env.BOT_TOKEN

export const bot = new Bot(token)

bot
    // логировать все входящие события
    .use(logActions)
    // парсер эмодзи
    .use(emojiParser())
    // отфильтровать других ботов
    .filter(filterBotsMiddleware)
    // удалить сообщение о закрепе от бота
    .filter(deletePinMessageAlert)
    // Добавление слоя отслеживания сессии
    .use(sessionMiddleware)
    // Гидрация контекста https://grammy.dev/ru/plugins/hydrate
    .use(hydrateContext())
    // Добавление middleware слоя
    .use(middleware)
    // Добавление контекстного меню
    .use(mainMenu);

if (process.env['NODE_ENV'] !== 'production') {
    bot
        .use(generateUpdateMiddleware())
        .use(generateBeforeMiddleware())
        .use(generateAfterMiddleware());
}

bot.command("start", startHandler)
bot.command("profile", profileHandler)
bot.command("set_my_username", setUsernameHandler)

bot.on("message", async (ctx) => {
    const session = await ctx.session

    switch (session.chat_mode) {
        case "write":
            await writeMessageHandler(ctx)
            break
        case "reply":
            await replyMessageHandler(ctx)
            break
        default:
            console.log("default")
    }
})

bot.catch(console.error.bind(console))

export const startBot = async () => {
    await bot.api.setMyCommands([
        { command: 'start', description: "Запуск бота" },
        { command: 'profile', description: "Мой профиль" },
        { command: 'set_my_username', description: "Установить псевдоним" },
    ])

    await bot.start()
}
