import { QueryBuilder } from "./models/common";
import { Game, GameModel } from "./models/game";
import { Genre, GenresModel } from "./models/genres";
import { PlatformModel } from "./models/platform";
import { PublisherModel } from "./models/publishers";
import Rawg from "./models/rawg";
import { StoreModel } from "./models/store";

const apiKey = "8f9502dd60e940eda43b6c4518c1dee5"

const rawg: Rawg = new Rawg(apiKey)

const gameModel: GameModel = new GameModel(rawg)
const genresModel: GenresModel = new GenresModel(rawg)
const storeModel: StoreModel = new StoreModel(rawg)
const publisherModel: PublisherModel = new PublisherModel(rawg)
const platformModel: PlatformModel = new PlatformModel(rawg)




const gameQueryBuilder: QueryBuilder = new QueryBuilder();
gameQueryBuilder.addFilterBy({
}).addPagination({
    page: 0,
    page_size: 3
})

async function a() {
    // const games = await gameModel.getGames(gameQueryBuilder.build());
    // const gtav: Game = new Game(rawg, games[0]);
    // const achievements = await gtav.getAchievementsList();



    // const genres = await genresModel.getGenres(gameQueryBuilder.build());
    // const action: Genre = new Genre(rawg, genres[0]);
    // const ad = await action.getDetail();


    // const stores = await storeModel.getStores(gameQueryBuilder.buildPagination())

    // const publishers = await publisherModel.getPublishers(gameQueryBuilder.buildPagination())

    const platforms = await platformModel.getPlatforms(gameQueryBuilder.buildPagination());
    const ParentPlatforms: any = await platformModel.getParentPlatforms(gameQueryBuilder.buildPagination());


    // console.log(platforms[0])
    console.log(ParentPlatforms[0].platforms)
    console.log(ParentPlatforms)
}

a()