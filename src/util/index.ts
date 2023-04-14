import { IPaginatedResponse } from "../types/common";
import { IGenre, IGenreDetail } from "../types/genre";

export function isPaginatedResponse<T>(object: any): object is IPaginatedResponse<T> {
    return "results" in object && typeof object.count === "number";
}

export function genreFilter(genres: (IGenre | IGenreDetail)[], retkey: "id" | "name" = "id"): string {
    let retString: string = ""
    genres.forEach((genre, index) => {
        retString += genre[retkey] + (index != genres.length - 1 ? "," : "")
    })
    return retString
}