import {lazySession} from "grammy"
import {PsqlAdapter} from "@grammyjs/storage-psql"
import {tgSessionClient} from "../../persistence/index.mjs"

const initializeSession = () => ({
    companion_candidate: {},    // user object
    chat_mode: "",    // "" | "reply" | "write" | ""

})

export const sessionMiddleware = lazySession({
    initial: initializeSession,
    storage: await PsqlAdapter.create({tableName: 'bot_sessions', client: tgSessionClient})
})

export const setSessionAttribute = async (ctx, attrs) => {
    return ctx.session.then(session => {
        'chat_mode' in attrs && (session.chat_mode = attrs.chat_mode)
        'companion_candidate' in attrs && (session.companion_candidate = attrs.companion_candidate)
    })
}

export const getSessionAttribute = async (ctx, attr) =>  {
    const session = await ctx.session
    return session[attr]
}


