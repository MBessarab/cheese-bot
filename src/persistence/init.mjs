import {query} from "./index.mjs";


// Создать таблицу users, если она не существует
async function users(){
    try {
        await query('CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY, first_name VARCHAR(256), username VARCHAR(256), custom_username VARCHAR(256), language_code VARCHAR(10), greeting_message TEXT DEFAULT \'Привет, напиши мне что-нибудь :)\', last_active_time TIMESTAMPTZ NOT NULL, create_time TIMESTAMPTZ NOT NULL, last_update_time TIMESTAMPTZ NOT NULL, delete_time TIMESTAMPTZ);')
        console.log('Users table ready.');
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу ban
async function ban(){
    try {
        await query('CREATE TABLE IF NOT EXISTS ban(from_user_id INTEGER, to_user_id INTEGER, reason TEXT, create_time TIMESTAMPTZ NOT NULL)');
        console.log('Ban table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу relation, связи пользователей друг с другом
async function relation() {
    try {
        await query('CREATE TABLE IF NOT EXISTS relation(requester_user_id INTEGER, responder_user_id INTEGER, create_time TIMESTAMPTZ NOT NULL, delete_time TIMESTAMPTZ, PRIMARY KEY(requester_user_id, responder_user_id))')
        console.log('Relation table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function messages(){
    try {
        await query('CREATE TABLE IF NOT EXISTS messages(responder_user_id INTEGER NOT NULL, requester_user_id INTEGER NOT NULL, text_msg TEXT, audio_msg TEXT, video_msg TEXT )')
        console.log('Messages chat table ready.');
    } catch (e) {
        console.error(e);
    }
}

export const migrate = async () => {
    await users()
    await ban()
    await relation()
    await messages()
}