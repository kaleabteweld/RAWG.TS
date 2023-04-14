export interface IGameRating {
    rating: number
    rating_top: number
    ratings: IRating
    ratings_count: number
}

export interface IEsrbRating {
    id: number
    slug: string
    name: string
}

export type reaction = "exceptional" | "recommended" | "meh" | "skip";

export interface IRating {
    id: number
    title: reaction
    count: number
    percent: number
}