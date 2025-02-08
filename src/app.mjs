import { startBot } from "./telegram/bot.mjs";
import {migrate} from "./persistence/init.mjs";

Promise.all([migrate(), startBot()])