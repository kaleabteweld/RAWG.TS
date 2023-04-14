import { IPagination, IPaginationWithOrdering } from "../types/common";
import { IQueryParameters } from "../types/game";
import { IGenreBehavior, IGenre, IGenreDetail, IGenreModelBehavior } from "../types/genre";
import Rawg from "./rawg";

export class TemplateModels<T> extends Rawg {
    private endpoint: string;
    private rawg: Rawg;

    public t: T[] = [];

    constructor(rawg: Rawg, endpoint: string) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.endpoint = endpoint;
    }

    // query?: Partial<IQueryParameters>
    async getAll<Q extends IQueryParameters>(query?: Q): Promise<T[] | never> {
        try {
            this.t = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.t
        } catch (error) {
            throw error
        }

    };
}

export class Genre extends Rawg implements IGenreBehavior {

    private endpoint: string = "genres";
    private rawg: Rawg;
    private genre: IGenre | IGenreDetail;

    public genreDetail?: IGenreDetail

    constructor(rawg: Rawg, genre: IGenre | IGenreDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.genre = genre;
    }

    getDetail(): Promise<IGenreDetail | never> {
        return this.getTemplate<IGenreDetail, IPaginationWithOrdering>("", "genreDetail");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const games = await this.rawg.sendGetRequest<T>([this.endpoint, this.genre.id.toString(), endpoint], query) as T;
            this[setKey] = games as any;
            return games;
        } catch (error) {
            throw error;
        }
    }
}