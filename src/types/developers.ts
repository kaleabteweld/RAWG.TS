import { IIdentifier, IPagination } from "./common"
import { IAddedGame } from "./game"

export interface IDeveloper extends IIdentifier {
    games_count: number
    image_background: string
    games: IAddedGame
}

export interface IDeveloperDetail extends IDeveloper {
    description: string
}
export interface IDeveloperModelBehavior {
    getDevelopers(query?: Partial<IPagination>): Promise<IDeveloper[] | never>
}

export interface IDeveloperBehavior {
    getDetail: () => Promise<IDeveloper | never>
}