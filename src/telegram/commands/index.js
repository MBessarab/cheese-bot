import {CommandGroup} from "@grammyjs/commands"
import {start} from "./start/index.mjs"
import {profile} from "./profile.mjs"
import {setUsername} from "./setUsername.mjs"
import {help} from "./help.mjs"

export const botCommandsGroup = new CommandGroup()

botCommandsGroup.command("start", "Запуск бота", start)
botCommandsGroup.command("profile", "Мой профиль", profile)
botCommandsGroup.command("set_username", "Установить псевдоним", setUsername)
botCommandsGroup.command("help", "Подсказка", help)
