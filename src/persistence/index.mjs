import pg from 'pg'

// Подключиться к базе данных Postgres
const pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_TG_BOT_DATABASE,
    max: 20
})

// Создаем клиент из пула
export const query = async (str, params) => {
    const client = await pool.connect()

    return client.query(str, params)
        // TODO возвращать ошибку на ui
        // .catch(err => console.error(`DATABASE ERROR: ${err} \n ${err.stack}`))
        .finally(() => client.release())
}

// Создание клиента для сессий
export const tgSessionClient = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_TG_BOT_DATABASE
})
try {
    await tgSessionClient.connect()
} catch (e) {
    console.error(e)
    await tgSessionClient.release()
}
