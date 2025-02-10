import {Bot} from "grammy";
import 'dotenv/config'
import {
    generateAfterMiddleware,
    generateBeforeMiddleware, generateUpdateMiddleware,
} from "telegraf-middleware-console-time";

import {middleware} from "./middleware/index.mjs";
import {sessionMiddleware} from "./session/index.mjs";
import { hydrateContext } from "@grammyjs/hydrate";
import {startHandler} from "./handlers/startHandler.mjs";
import {setUsernameHandler} from "./handlers/setUsernameHandler.mjs";
import {profileHandler} from "./handlers/profileHandler.mjs";
import {mainMenu} from "./menu/mainMenu.mjs";

const token = process.env.BOT_TOKEN

export const bot = new Bot(token)

bot
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

bot.catch(console.error.bind(console))

export const startBot = async () => {
    await bot.api.setMyCommands([
        { command: 'start', description: "Запуск бота" },
        { command: 'profile', description: "Мой профиль" },
        { command: 'set_my_username', description: "Установить псевдоним" },
    ])

    await bot.start()
}