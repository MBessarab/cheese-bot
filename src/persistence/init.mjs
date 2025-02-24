import {query} from "./index.mjs"

// Создать таблицу users, если она не существует
async function users(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS users(
                id BIGINT PRIMARY KEY, 
                chat_id BIGINT NOT NULL, 
                first_name VARCHAR(256), 
                username VARCHAR(256), 
                nickname VARCHAR(256), 
                language_code VARCHAR(10), 
                balance_stars BIGINT NOT NULL DEFAULT 0, 
                greeting_message TEXT DEFAULT 'Привет, напиши мне что-нибудь :)', 
                last_active_time TIMESTAMPTZ NOT NULL, 
                create_time TIMESTAMPTZ NOT NULL, 
                last_update_time TIMESTAMPTZ NOT NULL, 
                delete_time TIMESTAMPTZ
            )`
        )
        console.log('Users table ready.')
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу abuse
async function abuse(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS abuse(
                from_user_id BIGINT NOT NULL, 
                to_user_id BIGINT NOT NULL, 
                reason TEXT NOT NULL, 
                create_time TIMESTAMPTZ NOT NULL
            )`
        )
        console.log('Abuse table ready.')
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу message_type
async function messageType(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS message_type(
                id INTEGER PRIMARY KEY, 
                short VARCHAR(32) NOT NULL, 
                emoji VARCHAR(10) NOT NULL, 
                ru_title VARCHAR(32) NOT NULL, 
                en_title VARCHAR(32) NOT NULL 
            )`
        )
        console.log('TypeMessage table ready.')
    } catch (e) {
        console.error(e)
    }
}

// Заполнить таблицу message_type
async function fillTypeMessages(){
    try {
        await query(
            `INSERT INTO message_type(id, short, emoji, ru_title, en_title) VALUES 
                (1, 'text', '📜', 'Текст', 'text'),
                (2, 'voice', '🎙', 'Голосовое сообщение', 'Voice'),
                (3, 'video_note', '📺', 'Видеосообщение', 'Video note')
             ON CONFLICT DO NOTHING`
        )
        console.log('TypeMessages inserts ready.')
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу user_message_types
async function userTypeMessages(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS user_message_type(
                user_id BIGINT, 
                message_type_id INTEGER NOT NULL, 
                price_stars INTEGER DEFAULT 0, 
                last_update_time TIMESTAMPTZ NOT NULL, 
                PRIMARY KEY(user_id, message_type_id) 
            )`
        )
        console.log('UserTypeMessages table ready.')
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу relation, связи пользователей друг с другом
async function relation() {
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS relation(
                initiator_user_id BIGINT NOT NULL, 
                companion_user_id BIGINT NOT NULL, 
                reply_message_type_id INTEGER,
                abuse TEXT,
                create_time TIMESTAMPTZ NOT NULL, 
                delete_time TIMESTAMPTZ, 
                PRIMARY KEY(initiator_user_id, companion_user_id)
            )`
        )
        console.log('Relation table ready.')
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function messages(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS messages(
                message_id BIGINT NOT NULL, 
                initiator_user_id BIGINT NOT NULL, 
                companion_user_id BIGINT NOT NULL, 
                need_reply_message_type_id INTEGER, 
                reply_message_id bigint, 
                cost BIGINT,
                text VARCHAR(256), 
                voice_file_id VARCHAR(256), 
                video_note_file_id VARCHAR(256), 
                create_time TIMESTAMPTZ NOT NULL
            )`
        )
        console.log('Messages chat table ready.')
    } catch (e) {
        console.error(e)
    }
}


// Создать таблицу log, привязка пользователя к трендсеттеру
async function bot_logs(){
    try {
        await query(
            `CREATE TABLE IF NOT EXISTS bot_logs(
                user_id BIGINT NOT NULL, 
                username VARCHAR(256), 
                is_bot VARCHAR(256) NOT NULL, 
                message_id BIGINT NOT NULL, 
                date TIMESTAMPTZ NOT NULL, 
                text TEXT, 
                reply_markup JSON, 
                voice JSON, 
                video_note JSON, 
                photo JSON, 
                video JSON, 
                sticker JSON 
            )`
        )
        console.log('bot_logs table ready.')
    } catch (e) {
        console.error(e)
    }
}

export const migrate = async () => {
    await users()
    await abuse()
    await relation()
    await messages()
    await bot_logs()
    await messageType()
    await fillTypeMessages()
    await userTypeMessages()
}