import {lazySession} from "grammy";
import {PsqlAdapter} from "@grammyjs/storage-psql";
import {tgSessionClient} from "../../persistence/index.mjs";

const initializeSession = () => ({
    companion_candidate: {}, // user object
    chat_mode: ""   // "reply" | "write" | ""
})

export const sessionMiddleware = lazySession({
    initial: initializeSession,
    storage: await PsqlAdapter.create({tableName: 'bot_sessions', client: tgSessionClient})
})
