import { Game, GameModel, GameQueryBuilder } from "./models/game";
import { Genre, GenresModel } from "./models/genres";
import Rawg from "./models/rawg";

const apiKey = "8f9502dd60e940eda43b6c4518c1dee5"

const rawg: Rawg = new Rawg(apiKey)

const gameModel: GameModel = new GameModel(rawg)
const genresModel: GenresModel = new GenresModel(rawg)

const gameQueryBuilder: GameQueryBuilder = new GameQueryBuilder();
gameQueryBuilder.addFilterBy({
}).addPagination({
    page: 0,
    page_size: 1
})

async function a() {
    // const games = await gameModel.getGames(gameQueryBuilder.build());
    // const gtav: Game = new Game(rawg, games[0]);
    // const achievements = await gtav.getAchievementsList();



    const genres = await genresModel.getGenres(gameQueryBuilder.build());
    const action: Genre = new Genre(rawg, genres[0]);
    const ad = await action.getDetail();


    console.log(genres[0])
    console.log(ad)
}

a()