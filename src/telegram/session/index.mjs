import {lazySession} from "grammy";
import {PsqlAdapter} from "@grammyjs/storage-psql";
import {tgSessionClient} from "../../persistence/index.mjs";

const initializeSession = () => ({
    current_companion_id: null
})

export const sessionMiddleware = lazySession({
    initial: initializeSession,
    storage: await PsqlAdapter.create({tableName: 'bot_sessions', client: tgSessionClient})
})
