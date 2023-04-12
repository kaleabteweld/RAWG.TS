import { Game, GameModel, GameQueryBuilder } from "./models/game";
import Rawg from "./models/rawg";

console.log('Hello World');
const apiKey = "8f9502dd60e940eda43b6c4518c1dee5"

const rawg: Rawg = new Rawg(apiKey)
const gameModel: GameModel = new GameModel(rawg)

const gameQueryBuilder: GameQueryBuilder = new GameQueryBuilder();
gameQueryBuilder.addFilterBy({
    parent_platforms: "1"
})

async function a() {
    const games = await gameModel.getGames(gameQueryBuilder.build());
    const gtav: Game = new Game(rawg, games[0]);
    const achievements = await gtav.getAchievementsList();
    console.log(games[0])
    console.log(achievements)
}

a()