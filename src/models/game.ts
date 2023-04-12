import { IPagination, IPaginationWithOrdering } from "../types/common";
import { ICreator } from "../types/creator";
import { IGame, IGameAchievement, IGameBehavior, IGameModelBehavior, IGameScreenshots, IGameStore, IGameTrailer, IGamesDetails, IQueryBuilder, IQueryParameters, IQueryParametersFilterBy, IQueryParametersInclude } from "../types/game";
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

    getDLCs(query: IPagination): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], IPagination>("additions", "dlcs", query);
    }
    getCreators(query: IPagination): Promise<ICreator[] | never> {
        return this.getTemplate<ICreator[], IPagination>("creators", "creators", query);
    }
    getSeriesGames(query: IPagination): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], IPagination>("game-series", "seriesGames", query);
    }
    getParentGameForDlcs(query: IPagination): Promise<IGame[] | never> {
        return this.getTemplate<IGame[], IPagination>("parent-games", "parentGameForDlcs", query);
    }
    getScreenshots(query: IPaginationWithOrdering): Promise<IGameScreenshots[] | never> {
        return this.getTemplate<IGameScreenshots[], IPaginationWithOrdering>("screenshots", "screenshots", query);
    }
    getStore(query: IPaginationWithOrdering): Promise<IGameStore[] | never> {
        return this.getTemplate<IGameStore[], IPaginationWithOrdering>("stores", "stores", query);
    }
    getGameGetDetail(): Promise<IGamesDetails | never> {
        return this.getTemplate<IGamesDetails, IPaginationWithOrdering>("", "GameGetDetail");
    }
    getAchievementsList(): Promise<IGameAchievement[] | never> {
        return this.getTemplate<IGameAchievement[], IPaginationWithOrdering>("achievements", "achievements");
    }
    getTrailers(): Promise<IGameTrailer[] | never> {
        return this.getTemplate<IGameTrailer[], IPagination>("movies", "trailers");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const games = await this.rawg.sendGetRequest<T>([this.endpoint, this.game.id.toString(), endpoint], query) as T;
            this[setKey] = games as any;
            return games;
        } catch (error) {
            throw error;
        }
    }

}


export class GameQueryBuilder implements IQueryBuilder {
    private query: Partial<IQueryParameters> = {};

    public addFilterBy(filterBy: Partial<IQueryParametersFilterBy>) {
        this.query = {
            ...this.query,
            ...filterBy
        }
        return this
    };

    public addInclude(include: Partial<IQueryParametersInclude>) {
        this.query = {
            ...this.query,
            ...include
        }
        return this
    };

    public addPagination(pagination: Partial<IPagination>) {
        this.query = {
            ...this.query,
            ...pagination
        }
        return this
    };

    public build() {
        return this.query;
    }
}
