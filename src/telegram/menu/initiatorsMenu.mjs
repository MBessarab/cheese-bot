import {Menu} from "@grammyjs/menu";
import {backBtnMsg, helloMsg} from "../constants.mjs";
import {findNonAnsweredMessages} from "../../persistence/message.mjs";
import {findUsersByIds} from "../../persistence/user.mjs";

export const initiatorsMenu = new Menu("initiators_menu")
    .dynamic( async (ctx, range) => {
        const lastMessages = await findNonAnsweredMessages(ctx.user)

        // [[initiator_user_id, [...messages]]]
        const grouped = lastMessages.reduce((acc, msg) => {
            // Проверяем, существует ли группа для текущего id
            let group = acc.find(item => item[0] === msg.initiator_user_id);

            if (!group) {
                // Если группа не существует, создаем ее
                group = [msg.initiator_user_id, []];
                acc.push(group);
            }
            // Добавляем текущий элемент в соответствующую группу
            group[1].push(msg);

            return acc;
        }, []);

        const initiators = await findUsersByIds(grouped.map((item) => item[0]));

        // присылать по одному
        // принимать ответ
        // присылать еще
        initiators.forEach((initiator) => {
            range
                .text(
                    { text: `${initiator.custom_username || initiator.username}`, payload: initiator.user_id.toString() },
                    async (ctx, next) => {
                        // await ctx.editMessageText(companion.greeting_message)
                        //
                        // // Записать собеседника из payload в текущий диалог
                        // const session = await ctx.session
                        // session.current_companion_id = ctx.match

                        await next()
                    }
                )
                .row()
        })

        return range
    })
    .row()
    .back(backBtnMsg, async (ctx) => {
        await ctx.editMessageText(helloMsg)
    })
