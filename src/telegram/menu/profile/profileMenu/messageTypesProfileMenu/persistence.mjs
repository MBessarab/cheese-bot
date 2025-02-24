import {query} from "../../../../../persistence/index.mjs";

export async function getAllMessageTypes() {
    const result = await query(
        `SELECT * FROM message_type`
    )

    return result.rows
}
