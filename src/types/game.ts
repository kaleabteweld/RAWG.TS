import { IIdentifier, IPagination, IPaginationWithOrdering, IQueryParameters, TOrdering } from "./common"
import { ICreator } from "./creator"
import { IGenre } from "./genre"
import { IGamePlatform, IParentPlatforms } from "./platform"
import { IEsrbRating, IGameRating } from "./rating"
import { IStore } from "./store"
import { ITag } from "./tag"


export interface IGame extends IIdentifier, IGameRating {

    released: Date
    tba: boolean
    background_image: string
    reviews_text_count: string
    added: number
    added_by_status: IGameAddedByStatus
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: Date

    parent_platforms: IParentPlatforms[]
    genres: IGenre[]
    stores: IStore[]
    tags: ITag[]
    short_screenshots: IGameShortScreenshot[]
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

export interface IGenreGame extends IIdentifier {
    added: number
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

export interface IGameShortScreenshot {
    id: number
    image: string
}

export interface IGameScreenshots {
    image: string
    hidden: boolean
}

export interface IGameStore {
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

export interface IGameAddedByStatus {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
}

export interface IGameModelBehavior {
    getGames: (query: Partial<IQueryParameters>) => Promise<IGame[] | never>
}

export interface IGameBehavior {
    getDLCs: (query: IPagination) => Promise<IGame[]>
    getCreators: (query: IPaginationWithOrdering) => Promise<ICreator[] | never>
    getSeriesGames: (query: IQueryParameters) => Promise<IGame[] | never>
    getParentGameForDlcs: (query: IQueryParameters) => Promise<IGame[] | never>
    getScreenshots: (query: IPaginationWithOrdering) => Promise<IGameScreenshots[] | never>
    getStore: (query: IPaginationWithOrdering) => Promise<IGameStore[] | never>
    getDetail: () => Promise<IGamesDetails | never>
    getAchievementsList: () => Promise<IGameAchievement[] | never>
    getTrailers: () => Promise<IGameTrailer[] | never>
}
