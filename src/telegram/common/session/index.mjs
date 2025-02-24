import {lazySession} from "grammy"
import {PsqlAdapter} from "@grammyjs/storage-psql"
import {tgSessionClient} from "../../../persistence/index.mjs"

const initializeSession = () => ({
    companion_candidate: {},    // user object
    chat_mode: null,    // "reply" | "write" | "change_price_message_type" | change_profile_nickname
    profile_message_type: null,    // Настройка типа сообщения в профиле
    current_reply: {
        message_id: null, // последнее сообщение
        bot_message_id: null, // id пересланного сообщения для реплая компаньоном
        initiator_id: null, // null - присылать все соообщения, иначе сообщения выбранного инициатора
        // reply_mode: null // all - присылать все соообщения, initiator - прислать сообщение инициатора
    }
})

export const sessionMiddleware = lazySession({
    initial: initializeSession,
    storage: await PsqlAdapter.create({ tableName: 'bot_sessions', client: tgSessionClient })
})

export const setSessionAttribute = async (ctx, attrs) => {
    const session = await ctx.session

    'chat_mode' in attrs && (session.chat_mode = attrs.chat_mode)
    'companion_candidate' in attrs && (session.companion_candidate = attrs.companion_candidate)
    'profile_message_type' in attrs && (session.profile_message_type = attrs.profile_message_type)
    'current_reply' in attrs && (session.current_reply = attrs.current_reply)
}

export const getSessionAttribute = async (ctx, attr) =>  {
    const session = await ctx.session
    return session[attr]
}
