import {findRelationsFromUser} from "../../persistence/relation.mjs"
import {chooseWriteMsg, nothingWriteMsg} from "../constants.mjs"

export const chooseWriteMsgHandler = async (ctx, relations) => {
    relations.length ?
        await ctx.editMessageText(chooseWriteMsg) :
        await ctx.editMessageText(nothingWriteMsg)
}
