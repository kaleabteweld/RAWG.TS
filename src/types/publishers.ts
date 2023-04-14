import { IIdentifier, IQueryParameters } from "./common"
import { IAddedGame } from "./game"

export interface IPublisher extends IIdentifier {
    games_count: number
    image_background: string
    games: IAddedGame
}

export interface IPublishesDetail extends IPublisher {
    description: string
}

export interface IPublisherModelBehavior {
    getPublishers(query?: Partial<IQueryParameters>): Promise<IPublisher[] | never>
}

export interface IPublisherBehavior {
    getDetail: () => Promise<IPublisher | never>
}