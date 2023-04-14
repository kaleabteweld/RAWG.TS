import { IIdentifier, IPaginationWithOrdering } from "./common"
import { IAddedGame } from "./game"

export interface IGamePlatform {
    platform: IGamePlatformDetail
    released_at: string
    requirements_en: Requirements
    requirements_ru: Requirements
}

export interface Requirements {
    minimum: string
    recommended: string
}

export interface IGamePlatformDetail extends IIdentifier {
}
export interface IPlatform extends IIdentifier {
    games_count: number
    image_background: string
    image: string
    year_start: number
    year_end: number
    games: IAddedGame

}

export interface IPlatformDetail extends IPlatform {
    description: string
}

export interface IParentPlatforms extends IIdentifier {
    platforms: IPlatform[]
}

export interface IPlatformsModelBehavior {
    getPlatforms(query?: Partial<IPaginationWithOrdering>): Promise<IPlatform[] | never>
    getParentPlatforms(query?: Partial<IPaginationWithOrdering>): Promise<IParentPlatforms[] | never>
}

export interface IPlatformsBehavior {
    getDetail: () => Promise<IPlatform | never>
}