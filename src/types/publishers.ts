import { IIdentifier, IPagination, IQueryParameters } from "./common"
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
    getPublishers(query?: Partial<IPagination>): Promise<IPublisher[] | never>
}

export interface IPublisherBehavior {
    getDetail: () => Promise<IPublisher | never>
}