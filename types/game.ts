import { IIdentifier } from "./common"
import { IGamePlatform } from "./platform"

export interface IGame extends IIdentifier, IGameRating {

    released: Date
    tba: boolean
    background_image: string
    reviews_text_count: string
    added: number
    added_by_status: unknown
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: Date
}

export interface IGamesDetails extends IGame, IGameSocialMedia, IGameMetaData {

    name_original: string
    alternative_names: string[]
    description: string
    metacritic_platforms: IMetacriticPlatform[]
    background_image_additional: string
    website: string
    metacritic_url: string
    esrb_rating: IEsrbRating
    platforms: IGamePlatform[]
}

export interface IMetacriticPlatform {
    metascore: number
    url: string
}

export interface IGameSocialMedia {
    reddit_url: string
    reddit_name: string
    reddit_description: string
    reddit_logo: string
    reddit_count: number
    twitch_count: string
    youtube_count: string
}

export interface IEsrbRating {
    id: number
    slug: string
    name: string
}

export interface IGameRating {
    rating: number
    rating_top: number
    ratings: unknown
    ratings_count: number
}

export interface IGameMetaData {
    screenshots_count: number
    movies_count: number
    creators_count: number
    achievements_count: number
    additions_count: number
    game_series_count: number
    parents_count: number
    suggestions_count: number
    parent_achievements_count: string
    reviews_text_count: string
}

export interface IGameScreenshots {
    image: string
    hidden: boolean
}

export interface IGamestore {
    id: number
    game_id: string
    store_id: string
    url: string
}

export interface IGameAchievement {
    id: number
    name: string
    description: string
    image: string
    percent: string
}

export interface IGameTrailer {
    id: number
    name: string
    preview: string
    data: unknown
}