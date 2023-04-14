import { IIdentifier, IPagination } from "./common"
import { IAddedGame } from "./game"

export interface ICreatorRoles extends IIdentifier {

}
export interface ICreator extends IIdentifier {
    image: string
    image_background: string
    games_count: number
    positions: ICreatorRoles[]
    games: IAddedGame

}
export interface ICreatorDetail extends ICreator {
    description: string
    reviews_count: number
    rating: string
    rating_top: number
    updated: Date
}
export interface ICreatorModelBehavior {
    getCreators(query?: Partial<IPagination>): Promise<ICreator[] | never>
    getCreatorRoles(query?: Partial<IPagination>): Promise<ICreatorRoles[] | never>
}

export interface ICreatorBehavior {
    getDetail: () => Promise<ICreator | never>
}