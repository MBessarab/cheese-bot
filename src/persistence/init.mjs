import {query} from "./index.mjs";


// Создать таблицу users, если она не существует
async function users(){
    try {
        await query('CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY, first_name TEXT, username TEXT, language_code VARCHAR(10), last_active_time Timestamp, create_time Timestamp, last_update_time Timestamp, delete_time Timestamp);')
        console.log('Users table ready.');
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу ban
async function ban(){
    try {
        await query('CREATE TABLE IF NOT EXISTS ban(userId INTEGER)');
        console.log('Ban table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function conversations() {
    try {
        await query('CREATE TABLE IF NOT EXISTS conversations(responder_user_id INTEGER, requester_user_id INTEGER)')
        console.log('Conversations table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function messages(){
    try {
        await query('CREATE TABLE IF NOT EXISTS messages(responder_user_id INTEGER, requester_user_id INTEGER, text_msg TEXT, audio_msg TEXT, video_msg TEXT )')
        console.log('Messages chat table ready.');
    } catch (e) {
        console.error(e);
    }
}

export const migrate = async () => {
    await users()
    await ban()
    await conversations()
    await messages()
}