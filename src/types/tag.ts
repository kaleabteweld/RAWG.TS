import { IIdentifier } from "./common"

export interface ITag extends IIdentifier {
    games_count: number
    image_background: string
}

export interface ITagDetail extends ITag {
    description: string
}