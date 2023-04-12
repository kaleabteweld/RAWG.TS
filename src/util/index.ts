import { IPaginatedResponse } from "../types/common";

export function isPaginatedResponse<T>(object: any): object is IPaginatedResponse<T> {
    return "results" in object && typeof object.count === "number";
}
