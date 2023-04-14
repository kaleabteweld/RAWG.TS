import { IPagination, IPaginationWithOrdering } from "../types/common";
import { IPublisher, IPublisherBehavior, IPublisherModelBehavior, IPublishesDetail } from "../types/publishers";
import Rawg from "./rawg";

export class PublisherModel extends Rawg implements IPublisherModelBehavior {
    private endpoint: string = "publishers";
    private rawg: Rawg;

    public publisher: IPublisher[] = [];

    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getPublishers(query?: Partial<IPagination>): Promise<IPublisher[] | never> {
        try {
            this.publisher = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.publisher
        } catch (error) {
            throw error
        }

    };
}

export class Publisher extends Rawg implements IPublisherBehavior {

    private endpoint: string = "publishers";
    private rawg: Rawg;
    private store: IPublisher | IPublishesDetail;

    public publishesDetail?: IPublishesDetail

    constructor(rawg: Rawg, store: IPublisher | IPublishesDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.store = store;
    }

    getDetail(): Promise<IPublishesDetail | never> {
        return this.getTemplate<IPublishesDetail, IPaginationWithOrdering>("", "publishesDetail");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const t = await this.rawg.sendGetRequest<T>([this.endpoint, this.store.id.toString(), endpoint], query) as T;
            this[setKey] = t as any;
            return t;
        } catch (error) {
            throw error;
        }
    }
}