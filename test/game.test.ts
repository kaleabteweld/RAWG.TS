import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { gameQueryBuilder, rawg } from "./common";
import { MockData } from "./testData";
import { Game, GameModel } from "../src/models/game";
import { IGame, IGameAchievement } from "../src/types/game";
import RawgMock from "./mock/rawg.mock";
import { ICreator } from "../src/types/creator";



describe("Game", () => {
    const mock = new MockAdapter(axios);
    var games: IGame[] = []
    const mockData: MockData = new MockData()

    afterEach(() => {
        mock.reset();
    });

    describe("GameModel", () => {


        it('should get a list of games', async () => {

            const rawgMock: RawgMock = new RawgMock(rawg, mock, {
                mockData: await mockData.getGames(),
                status: 200,
            });

            const gameModel: GameModel = new GameModel(rawgMock)

            games = await gameModel.getGames(gameQueryBuilder.build());

            expect(games.length).toBeGreaterThan(1);
        });
    })


    describe("Game Class", () => {


        it("should get a list of Achievements", async () => {

            const rawgMock: RawgMock = new RawgMock(rawg, mock, {
                mockData: await mockData.getAchievements(),
                status: 200,
            });

            const game: Game = new Game(rawgMock, games[0])

            const achievements: IGameAchievement[] = await game.getAchievementsList();

            expect(achievements.length).toBeGreaterThan(1)
        })


    })


});