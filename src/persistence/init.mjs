import {query} from "./index.mjs";

// Создать таблицу users, если она не существует
async function users(){
    try {
        await query(
            'CREATE TABLE IF NOT EXISTS users(' +
            'user_id bigint PRIMARY KEY, ' +
            'chat_id bigint NOT NULL, ' +
            'first_name VARCHAR(256), ' +
            'username VARCHAR(256), ' +
            'custom_username VARCHAR(256), ' +
            'language_code VARCHAR(10), ' +
            'greeting_message TEXT DEFAULT \'Привет, напиши мне что-нибудь :)\', ' +
            'last_active_time TIMESTAMPTZ NOT NULL, ' +
            'create_time TIMESTAMPTZ NOT NULL, ' +
            'last_update_time TIMESTAMPTZ NOT NULL, ' +
            'delete_time TIMESTAMPTZ' +
            ')'
        )
        console.log('Users table ready.');
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу abuse
async function abuse(){
    try {
        await query(
            'CREATE TABLE IF NOT EXISTS abuse(' +
            'from_user_id BIGINT NOT NULL, ' +
            'to_user_id BIGINT NOT NULL, ' +
            'reason TEXT NOT NULL, ' +
            'create_time TIMESTAMPTZ NOT NULL' +
            ')'
        );
        console.log('Abuse table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу relation, связи пользователей друг с другом
async function relation() {
    try {
        await query(
            'CREATE TABLE IF NOT EXISTS relation(' +
            'initiator_user_id BIGINT NOT NULL, ' +
            'companion_user_id BIGINT NOT NULL, ' +
            'create_time TIMESTAMPTZ NOT NULL, ' +
            'delete_time TIMESTAMPTZ, ' +
            'PRIMARY KEY(initiator_user_id, companion_user_id)' +
            ')'
        )
        console.log('Relation table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function messages(){
    try {
        await query(
            'CREATE TABLE IF NOT EXISTS messages(' +
            'message_id BIGINT NOT NULL, ' +
            'initiator_user_id BIGINT NOT NULL, ' +
            'companion_user_id BIGINT NOT NULL, ' +
            'reply_message_id bigint, ' +
            'answered BOOLEAN DEFAULT false NOT NULL, ' +
            'text VARCHAR(256), ' +
            'audio_file_id VARCHAR(256), ' +
            'video_file_id VARCHAR(256), ' +
            'create_time TIMESTAMPTZ NOT NULL' +
            ')'
        )
        console.log('Messages chat table ready.');
    } catch (e) {
        console.error(e);
    }
}


// Создать таблицу log, привязка пользователя к трендсеттеру
async function bot_logs(){
    try {
        await query(
            'CREATE TABLE IF NOT EXISTS bot_logs(' +
            'user_id BIGINT NOT NULL, ' +
            'username VARCHAR(256), ' +
            'is_bot VARCHAR(256) NOT NULL, ' +
            'message_id BIGINT NOT NULL, ' +
            'date BIGINT NOT NULL, ' +
            'text TEXT, ' +
            'reply_markup JSON, ' +
            'voice JSON, ' +
            'video_note JSON, ' +
            'photo JSON, ' +
            'video JSON, ' +
            'sticker JSON ' +
            ')'
        )
        console.log('Messages chat table ready.');
    } catch (e) {
        console.error(e);
    }
}

export const migrate = async () => {
    await users()
    await abuse()
    await relation()
    await messages()
    await bot_logs()
}