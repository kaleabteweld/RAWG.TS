import { IIdentifier } from "./common"

export interface IPublishers extends IIdentifier {
    games_count: number
    image_background: string
}

export interface IPublishersDetail extends IPublishers {
    description: string
}