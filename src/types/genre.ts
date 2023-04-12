import { IIdentifier } from "./common"

export interface IGenre extends IIdentifier {
    games_count: number
    image_background: string
}

export interface IGenreDetail extends IGenre {
    description: string
}