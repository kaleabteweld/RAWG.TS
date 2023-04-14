import { IPagination, IPaginationWithOrdering } from "../types/common";
import { ICreator, ICreatorBehavior, ICreatorDetail, ICreatorModelBehavior, ICreatorRoles } from "../types/creator";
import Rawg from "./rawg";

export class CreatorModel extends Rawg implements ICreatorModelBehavior {
    private endpoint: string = "creators";
    private rawg: Rawg;

    public creators: ICreator[] = [];
    public creatorsRoles: ICreatorRoles[] = [];


    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getCreators(query?: Partial<IPagination>): Promise<ICreator[] | never> {
        try {
            this.creators = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.creators
        } catch (error) {
            throw error
        }

    };

    async getCreatorRoles(query?: Partial<IPagination>): Promise<ICreatorRoles[] | never> {
        try {
            this.creatorsRoles = await this.rawg.sendGetRequest(["creator-roles"], query)
            return this.creatorsRoles
        } catch (error) {
            throw error
        }

    };
}

export class Creator extends Rawg implements ICreatorBehavior {

    private endpoint: string = "Creators";
    private rawg: Rawg;

    private creator: ICreator | ICreatorDetail;

    public creatorDetail?: ICreatorDetail

    constructor(rawg: Rawg, creator: ICreator | ICreatorDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.creator = creator;
    }

    getDetail(): Promise<ICreatorDetail | never> {
        return this.getTemplate<ICreatorDetail, IPaginationWithOrdering>("", "creatorDetail");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const t = await this.rawg.sendGetRequest<T>([this.endpoint, this.creator.id.toString(), endpoint], query) as T;
            this[setKey] = t as any;
            return t;
        } catch (error) {
            throw error;
        }
    }
}