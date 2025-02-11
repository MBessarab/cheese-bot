import {query} from "./index.mjs";


// Создать таблицу users, если она не существует
async function users(){
    try {
        await query('CREATE TABLE IF NOT EXISTS users(user_id bigint PRIMARY KEY, first_name VARCHAR(256), username VARCHAR(256), custom_username VARCHAR(256), language_code VARCHAR(10), greeting_message TEXT DEFAULT \'Привет, напиши мне что-нибудь :)\', last_active_time TIMESTAMPTZ NOT NULL, create_time TIMESTAMPTZ NOT NULL, last_update_time TIMESTAMPTZ NOT NULL, delete_time TIMESTAMPTZ);')
        console.log('Users table ready.');
    } catch (e) {
        console.error(e)
    }
}

// Создать таблицу abuse
async function abuse(){
    try {
        await query('CREATE TABLE IF NOT EXISTS abuse(from_user_id bigint, to_user_id bigint, reason TEXT, create_time TIMESTAMPTZ NOT NULL)');
        console.log('Abuse table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу relation, связи пользователей друг с другом
async function relation() {
    try {
        await query('CREATE TABLE IF NOT EXISTS relation(initiator_user_id bigint, companion_user_id bigint, create_time TIMESTAMPTZ NOT NULL, delete_time TIMESTAMPTZ, PRIMARY KEY(initiator_user_id, companion_user_id))')
        console.log('Relation table ready.');
    } catch (e) {
        console.error(e);
    }
}

// Создать таблицу following, привязка пользователя к трендсеттеру
async function messages(){
    try {
        await query('CREATE TABLE IF NOT EXISTS messages(initiator_user_id bigint NOT NULL, companion_user_id bigint NOT NULL, answered BOOLEAN DEFAULT false NOT NULL, text_msg TEXT, create_time TIMESTAMPTZ NOT NULL)')
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
}