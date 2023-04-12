import { IIdentifier } from "./common"

export interface IStore extends IIdentifier {
    domain: string
    games_count: number
    image_background: string
}

export interface IStoreDetail extends IStore {
    description: string
}