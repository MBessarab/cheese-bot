import {Bot} from "grammy";
import 'dotenv/config'
import {
    generateAfterMiddleware,
    generateBeforeMiddleware, generateUpdateMiddleware,
} from "telegraf-middleware-console-time";

import {menu} from "./menu/index.mjs";
import {middleware} from "./middleware/index.mjs";
import {sessionMiddleware} from "./session/index.mjs";
import {helloMsg} from "./constants.mjs";
import { hydrateContext } from "@grammyjs/hydrate";

const token = process.env.BOT_TOKEN

export const bot = new Bot(token)

bot
    // Добавление контекстного меню
    .use(menu)
    // Добавление middleware слоя
    .use(middleware)
    // Добавление слоя отслеживания сессии
    .use(sessionMiddleware)
    // Гидрация контекста https://grammy.dev/ru/plugins/hydrate
    .use(hydrateContext());

if (process.env['NODE_ENV'] !== 'production') {
    bot
        .use(generateUpdateMiddleware())
        .use(generateBeforeMiddleware())
        .use(generateAfterMiddleware());
}

bot
    .command("start", async (ctx) => {
        await ctx.session
            .then((session) => {
                session.current_conversation
            })

        await ctx.reply(helloMsg, {
            reply_markup: menu
        })
    })


bot.catch(console.error.bind(console))

export const startBot = async () => {
    await bot.start()
}