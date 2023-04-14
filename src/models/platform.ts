import { IPagination, IPaginationWithOrdering } from "../types/common";
import { IParentPlatforms, IPlatform, IPlatformDetail, IPlatformsBehavior, IPlatformsModelBehavior } from "../types/platform";
import Rawg from "./rawg";

export class PlatformModel extends Rawg implements IPlatformsModelBehavior {
    private endpoint: string = "platforms";
    private rawg: Rawg;

    public platforms: IPlatform[] = [];
    public ParentPlatforms: IParentPlatforms[] = [];


    constructor(rawg: Rawg) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
    }

    async getPlatforms(query?: Partial<IPaginationWithOrdering>): Promise<IPlatform[] | never> {
        try {
            this.platforms = await this.rawg.sendGetRequest([this.endpoint], query)
            return this.platforms
        } catch (error) {
            throw error
        }

    };

    async getParentPlatforms(query?: Partial<IPaginationWithOrdering>): Promise<IParentPlatforms[] | never> {
        try {
            this.ParentPlatforms = await this.rawg.sendGetRequest([this.endpoint, "lists", "parents"], query)
            return this.ParentPlatforms
        } catch (error) {
            throw error
        }

    };
}

export class Genre extends Rawg implements IPlatformsBehavior {

    private endpoint: string = "genres";
    private rawg: Rawg;
    private platform: IPlatform | IPlatformDetail;

    public platformDetail?: IPlatformDetail;

    constructor(rawg: Rawg, platform: IPlatform | IPlatformDetail) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.platform = platform;
    }

    getDetail(): Promise<IPlatformDetail | never> {
        return this.getTemplate<IPlatformDetail, IPaginationWithOrdering>("", "platformDetail");
    }

    private async getTemplate<T, P extends IPagination | IPaginationWithOrdering>(endpoint: string, setKey: keyof this, query?: P): Promise<T | never> {
        try {
            const t = await this.rawg.sendGetRequest<T>([this.endpoint, this.platform.id.toString(), endpoint], query) as T;
            this[setKey] = t as any;
            return t;
        } catch (error) {
            throw error;
        }
    }
}