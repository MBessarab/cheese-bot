import {requestMenu} from "./requestMenu.mjs";
import {mainMenu} from "./mainMenu.mjs";
import {responseMenu} from "./responseMenu.mjs";

mainMenu.register([requestMenu, responseMenu])

export const menu = mainMenu
