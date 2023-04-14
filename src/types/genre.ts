import { IIdentifier, IQueryParameters } from "./common"
import { IAddedGame } from "./game"

export interface IGenre extends IIdentifier {
    games_count: number
    image_background: string
    games: IAddedGame
}

export interface IGenreDetail extends IGenre {
    description: string
}

export interface IGenreModelBehavior {
    getGenres(query?: Partial<IQueryParameters>): Promise<IGenre[] | never>
}

export interface IGenreBehavior {
    getDetail: () => Promise<IGenre | never>
}