import { IPagination } from "../types/common";
import { IQueryBuilder, IQueryParameters, IQueryParametersFilterBy, IQueryParametersInclude } from "../types/common";

export class QueryBuilder implements IQueryBuilder {
    private query: Partial<IQueryParameters> = {};

    public addFilterBy(filterBy: Partial<IQueryParametersFilterBy>) {
        this.query = {
            ...this.query,
            ...filterBy
        }
        return this
    };

    public addInclude(include: Partial<IQueryParametersInclude>) {
        this.query = {
            ...this.query,
            ...include
        }
        return this
    };

    public addPagination(pagination: Partial<IPagination>) {
        this.query = {
            ...this.query,
            ...pagination
        }
        return this
    };

    public build() {
        return this.query;
    }
}