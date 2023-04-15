import { MockData } from "../test/testData";
import { QueryBuilder } from "./models/common";
import { CreatorModel } from "./models/creator";
import { DeveloperModel } from "./models/developers";
import { Game, GameModel } from "./models/game";
import { Genre, GenresModel } from "./models/genres";
import { PlatformModel } from "./models/platform";
import { PublisherModel } from "./models/publishers";
import Rawg from "./models/rawg";
import { StoreModel } from "./models/store";

import fileSystem from "fs"

const apiKey = "8f9502dd60e940eda43b6c4518c1dee5"

const rawg: Rawg = new Rawg(apiKey)

const gameModel: GameModel = new GameModel(rawg)
const genresModel: GenresModel = new GenresModel(rawg)
const storeModel: StoreModel = new StoreModel(rawg)
const publisherModel: PublisherModel = new PublisherModel(rawg)
const platformModel: PlatformModel = new PlatformModel(rawg)
const developerModel: DeveloperModel = new DeveloperModel(rawg)
const creatorModel: CreatorModel = new CreatorModel(rawg)






const gameQueryBuilder: QueryBuilder = new QueryBuilder();
gameQueryBuilder.addFilterBy({
}).addPagination({
    page: 0,
    page_size: 3
})

async function a() {
    const games = await gameModel.getGames(gameQueryBuilder.build());
    // const mockData: MockData = new MockData();
    // mockData.addGames(games)


    const gtav: Game = new Game(rawg, games[0]);
    const achievements = await gtav.getAchievementsList();
    // console.log("achievements ", achievements)
    // mockData.addAchievements(achievements)



    // const genres = await genresModel.getGenres(gameQueryBuilder.build());
    // const action: Genre = new Genre(rawg, genres[0]);
    // const ad = await action.getDetail();


    // const stores = await storeModel.getStores(gameQueryBuilder.buildPagination())

    // const publishers = await publisherModel.getPublishers(gameQueryBuilder.buildPagination())

    // const platforms = await platformModel.getPlatforms(gameQueryBuilder.buildPagination());
    // const ParentPlatforms: any = await platformModel.getParentPlatforms(gameQueryBuilder.buildPagination());

    // const devs = await developerModel.getDevelopers(gameQueryBuilder.buildPagination());

    // const creator = await creatorModel.getCreators(gameQueryBuilder.buildPagination());
    // const creatorRoles: any = await creatorModel.getCreatorRoles(gameQueryBuilder.buildPagination());


    // console.log(games)
    // console.log(creatorRoles[0])
}

a()