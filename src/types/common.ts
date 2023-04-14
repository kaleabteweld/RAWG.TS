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

export interface IQueryParametersFilterBy {
    platforms: string
    stores: string
    developers: string
    publishers: string
    genres: string
    tags: string
    creators: string
    dates: string
    updated: string
    platforms_count: string
    parent_platforms: string
    metacritic: number
    exclude_collection: number
}

export interface IQueryParametersInclude {
    search_precise: boolean
    search_exact: boolean
    exclude_additions: boolean
    exclude_parents: boolean
    exclude_game_series: boolean
    exclude_stores: boolean
}

export interface IQueryParameters extends IPagination, IQueryParametersFilterBy, IQueryParametersInclude {
    search: string
    ordering: TOrdering
}

export interface IQueryBuilder {
    // addFilterBy: <T extends IQueryParametersFilterBy>(filterBy: T) => Omit<this, 'addFilterBy'>;
    addFilterBy: <T extends IQueryParametersFilterBy>(filterBy: T) => IQueryBuilder;
    addInclude: <T extends IQueryParametersInclude>(include: T) => IQueryBuilder;
    addPagination: <T extends IPagination>(pagination: T) => IQueryBuilder;
    build: () => any;
}

export interface ISimpleBehavior<T> {
    getDetail: () => Promise<T | never>
}