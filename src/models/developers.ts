import { IPagination, IPaginationWithOrdering } from "../types/common";
import { IDeveloper, IDeveloperBehavior, IDeveloperDetail, IDeveloperModelBehavior } from "../types/developers";
import Rawg from "./rawg";

export class DeveloperModel extends Rawg implements IDeveloperModelBehavior {
    private endpoint: string = "developers";
    private rawg: Rawg;

    public developers: IDeveloper[] = [];

    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getDevelopers(query?: Partial<IPagination>): Promise<IDeveloper[] | never> {
        try {
            this.developers = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.developers
        } catch (error) {
            throw error
        }

    };
}

export class Developer extends Rawg implements IDeveloperBehavior {

    private endpoint: string = "developers";
    private rawg: Rawg;
    private developer: IDeveloper | IDeveloperDetail;

    public developerDetail?: IDeveloperDetail

    constructor(rawg: Rawg, developer: IDeveloper | IDeveloperDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.developer = developer;
    }

    getDetail(): Promise<IDeveloperDetail | never> {
        return this.getTemplate<IDeveloperDetail, IPaginationWithOrdering>("", "developerDetail");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const t = await this.rawg.sendGetRequest<T>([this.endpoint, this.developer.id.toString(), endpoint], query) as T;
            this[setKey] = t as any;
            return t;
        } catch (error) {
            throw error;
        }
    }
}