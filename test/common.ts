import { QueryBuilder } from "../src/models/common";
import { GameModel } from "../src/models/game"
import Rawg from "../src/models/rawg"

const apiKey = ""
export const rawg: Rawg = new Rawg(apiKey)



export const gameQueryBuilder: QueryBuilder = new QueryBuilder();
gameQueryBuilder.addFilterBy({
}).addPagination({
    page: 0,
    page_size: 3
})
