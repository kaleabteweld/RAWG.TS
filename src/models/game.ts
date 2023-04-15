import { IPagination, IPaginationWithOrdering, IQueryParameters } from "../types/common";
import { ICreator } from "../types/creator";
import { IGame, IGameAchievement, IGameBehavior, IGameModelBehavior, IGameScreenshots, IGameStore, IGameTrailer, IGamesDetails } from "../types/game";
import Rawg from "./rawg";

export class GameModel extends Rawg implements IGameModelBehavior {

    private endpoint: string = "games";
    private rawg: Rawg;

    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getGames(query?: Partial<IQueryParameters>): Promise<IGame[] | never> {
        return this.rawg.sendGetRequest([this.endpoint], query)
    };

}

export class Game extends Rawg implements IGameBehavior {

    private endpoint: string = "games";
    private rawg: Rawg;
    private game: IGame | IGamesDetails;

    public dlcs: IGame[] = [];
    public creators: ICreator[] = [];
    public seriesGames: IGame[] = [];
    public parentGameForDlcs: IGame[] = [];
    public screenshots: IGameScreenshots[] = [];
    public stores: IGameStore[] = [];
    public GameGetDetail?: IGamesDetails;
    public achievements: IGameAchievement[] = [];
    public trailers: IGameTrailer[] = [];


    constructor(rawg: Rawg, game: IGame | IGamesDetails) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.game = game;
    }

    getDLCs(query: Partial<IPagination>): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], Partial<IPagination>>("additions", "dlcs", query);
    }
    getCreators(query: Partial<IPagination>): Promise<ICreator[] | never> {
        return this.getTemplate<ICreator[], Partial<IPagination>>("creators", "creators", query);
    }
    getSeriesGames(query: Partial<IPagination>): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], Partial<IPagination>>("game-series", "seriesGames", query);
    }
    getParentGameForDlcs(query: Partial<IPagination>): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], Partial<IPagination>>("parent-games", "parentGameForDlcs", query);
    }
    getScreenshots(query: Partial<IPaginationWithOrdering>): Promise<IGameScreenshots[] | never> {
        return this.getTemplate<IGameScreenshots[], Partial<IPaginationWithOrdering>>("screenshots", "screenshots", query);
    }
    getStore(query: Partial<IPaginationWithOrdering>): Promise<IGameStore[] | never> {
        return this.getTemplate<IGameStore[], Partial<IPaginationWithOrdering>>("stores", "stores", query);
    }
    getDetail(): Promise<IGamesDetails | never> {
        return this.getTemplate<IGamesDetails, IPaginationWithOrdering>("", "GameGetDetail");
    }
    getAchievementsList(): Promise<IGameAchievement[] | never> {
        return this.getTemplate<IGameAchievement[], IPaginationWithOrdering>("achievements", "achievements");
    }
    getTrailers(): Promise<IGameTrailer[] | never> {
        return this.getTemplate<IGameTrailer[], IPagination>("movies", "trailers");
    }

    private async getTemplate<T, P extends IPagination | Partial<IPagination> | IPaginationWithOrdering | Partial<IPaginationWithOrdering>>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const games = await this.rawg.sendGetRequest<T>([this.endpoint, this.game.id.toString(), endpoint], query) as T;
            this[setKey] = games as any;
            return games;
        } catch (error) {
            throw error;
        }
    }

}

