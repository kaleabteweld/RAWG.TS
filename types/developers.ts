import { IIdentifier } from "./common"

export interface IDeveloper extends IIdentifier {
    games_count: number
    image_background: string
}

export interface IDeveloperDetail extends IDeveloper {
    description: string
}