export interface IIdentifier {
    id: number
    slug: string
    name: string
}

export interface IPagination {
    page: number
    page_size: number
}

export type TOrdering = "name" | "released" | "added" | "created" | "updated" | "rating" | "metacritic";

export interface IPaginationWithOrdering {
    page: number
    page_size: number
    ordering: TOrdering
}

export interface IPaginatedResponse<T> {
    count: number
    next: string
    previous: string
    results: T
}