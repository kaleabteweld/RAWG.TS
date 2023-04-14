import { IIdentifier, IQueryParameters } from "./common"
import { IAddedGame } from "./game"

export interface IStore extends IIdentifier {
    domain: string
    games_count: number
    image_background: string
    games: IAddedGame
}

export interface IStoreDetail extends IStore {
    description: string
}
export interface IStoreModelBehavior {
    getStores(query?: Partial<IQueryParameters>): Promise<IStore[] | never>
}

export interface IStoreBehavior {
    getDetail: () => Promise<IStore | never>
}