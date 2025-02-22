import {Bot} from "grammy"
import 'dotenv/config'
import {
    generateAfterMiddleware,
    generateBeforeMiddleware, generateUpdateMiddleware,
} from "telegraf-middleware-console-time"

import {sessionMiddleware} from "./session/index.mjs"
import { hydrateContext } from "@grammyjs/hydrate"
import {mainMenu} from "./menu/mainMenu.mjs"
import {deletePinMessageAlert, filterBotsMiddleware} from "./middleware/filter.mjs"
import {middleware} from "./middleware/enrichment.mjs"
import {logActions} from "./middleware/log.mjs"
import {botCommandsGroup} from "./commands/index.js"
import {messageHandler} from "./messages/messageHandler.mjs"

const token = process.env.BOT_TOKEN

export const bot = new Bot(token)

bot
    // логировать все входящие события
    .use(logActions)
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
    .use(mainMenu)
    // установить меню с командами
    .use(botCommandsGroup)

if (process.env['NODE_ENV'] !== 'production') {
    bot
        .use(generateUpdateMiddleware())
        .use(generateBeforeMiddleware())
        .use(generateAfterMiddleware())
}

// Registration messages
bot.on([":text", ":voice", ":video_note", "message:media"], messageHandler)

bot.catch(console.error.bind(console))

export const startBot = async () => {
    await botCommandsGroup.setCommands(bot)
    await bot.start()
}
