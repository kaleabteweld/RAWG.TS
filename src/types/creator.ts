import { IIdentifier } from "./common"

export interface ICreatorRoles extends IIdentifier {

}
export interface ICreator extends IIdentifier {
    image: string
    image_background: string
    games_count: number
}
export interface ICreatorDetail {
    description: string
    reviews_count: number
    rating: string
    rating_top: number
    updated: Date
}