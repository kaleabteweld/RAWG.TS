import { IIdentifier } from "./common"

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
}

export interface IPlatformDetail extends IPlatform {
    description: string
}

export interface IParentPlatforms extends IIdentifier { }