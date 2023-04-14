import { IPagination, IPaginationWithOrdering, IQueryParameters } from "../types/common";
import { IStore, IStoreBehavior, IStoreDetail, IStoreModelBehavior } from "../types/store";
import Rawg from "./rawg";

export class StoreModel extends Rawg implements IStoreModelBehavior {
    private endpoint: string = "stores";
    private rawg: Rawg;

    public stores: IStore[] = [];

    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getStores(query?: Partial<IQueryParameters>): Promise<IStore[] | never> {
        try {
            this.stores = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.stores
        } catch (error) {
            throw error
        }

    };
}

export class Store extends Rawg implements IStoreBehavior {

    private endpoint: string = "stores";
    private rawg: Rawg;
    private store: IStore | IStoreDetail;

    public storeDetail?: IStoreDetail

    constructor(rawg: Rawg, store: IStore | IStoreDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.store = store;
    }

    getDetail(): Promise<IStoreDetail | never> {
        return this.getTemplate<IStoreDetail, IPaginationWithOrdering>("", "storeDetail");
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