import { IIdentifier, IPaginatedResponse } from "../types/common";
import { IGenre, IGenreDetail } from "../types/genre";

export function isPaginatedResponse<T>(object: any): object is IPaginatedResponse<T> {
    return "results" in object && typeof object.count === "number";
}

export function getFilter<T extends IIdentifier>(things: T[], retkey: keyof T = "id"): string {
    let retString: string = ""
    things.forEach((thing, index) => {
        retString += thing[retkey] + (index != things.length - 1 ? "," : "")
    })
    return retString
}