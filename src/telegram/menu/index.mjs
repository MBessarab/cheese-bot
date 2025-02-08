import {writeMenu} from "./writeMenu.mjs";
import {mainMenu} from "./mainMenu.mjs";
import {readMenu} from "./readMenu.mjs";

mainMenu.register([writeMenu, readMenu])

export const menu = mainMenu
