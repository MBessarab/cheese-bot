import {getSessionAttribute, setSessionAttribute} from "../../common/session/index.mjs"
import {messageTypesProfileMenu} from "../../menu/main_menu/profile/profile_menu/message_types_profile_menu/index.mjs";
import {getUserMessageTypes, updateUserMessageTypeWithPriceStars} from "../../persistence/user_message_type.mjs";

export const changePriceMessageTypeHandler = async (ctx) => {
    const messageTypeId = await getSessionAttribute(ctx, "profile_message_type_id")

    await updateUserMessageTypeWithPriceStars(ctx.user.id, ctx.msg.text, messageTypeId)

    const allMessageTypes = await getUserMessageTypes(ctx.user)

    const messageTypesText = allMessageTypes.map(messageType => {
        const enabledMessageType = messageType.active ? `Вкл.` : `Выкл`
        const price = messageType.price_stars

        return `\n${messageType.emoji} - ${messageType.ru_title} \n ┝ Статус: ${enabledMessageType} \n ┕ Стоимость сообщения: ${price} \n`
    }).join('')

    const messageText = `Настройка типов ответов: \n${messageTypesText}`
    await ctx.api.sendMessage(ctx.user.chat_id, messageText, {
        reply_markup: messageTypesProfileMenu
    })
    await setSessionAttribute(ctx, { profile_message_type_id: null })
}