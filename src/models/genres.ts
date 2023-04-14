import { IPagination, IPaginationWithOrdering, IQueryParameters } from "../types/common";
import { IGenreBehavior, IGenre, IGenreDetail, IGenreModelBehavior } from "../types/genre";
import Rawg from "./rawg";

export class GenresModel extends Rawg implements IGenreModelBehavior {
    private endpoint: string = "genres";
    private rawg: Rawg;

    public genres: IGenre[] = [];

    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getGenres(query?: Partial<IQueryParameters>): Promise<IGenre[] | never> {
        try {
            this.genres = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.genres
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
            const t = await this.rawg.sendGetRequest<T>([this.endpoint, this.genre.id.toString(), endpoint], query) as T;
            this[setKey] = t as any;
            return t;
        } catch (error) {
            throw error;
        }
    }
}