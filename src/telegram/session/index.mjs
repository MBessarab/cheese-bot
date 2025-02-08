import {lazySession} from "grammy";
import {PsqlAdapter} from "@grammyjs/storage-psql";
import {tgSessionClient} from "../../persistence/index.mjs";

const initializeSession = () => ({
    current_conversation_id: undefined
})

export const sessionMiddleware = lazySession({
    initial: initializeSession,
    storage: await PsqlAdapter.create({tableName: 'bot_sessions', client: tgSessionClient})
})