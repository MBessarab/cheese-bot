import {CommandGroup} from "@grammyjs/commands"
import {start} from "./start/index.mjs"
import {profile} from "./profile.mjs"
import {help} from "./help.mjs"
import {ban} from "./ban/index.mjs";

export const botCommandsGroup = new CommandGroup()

botCommandsGroup.command("start", "Запуск бота", start)
botCommandsGroup.command("profile", "Мой профиль", profile)
botCommandsGroup.command("set_nickname", "Установить псевдоним", ban)
botCommandsGroup.command("ban", "Бан собеседника", profile)
botCommandsGroup.command("help", "Подсказка", help)
