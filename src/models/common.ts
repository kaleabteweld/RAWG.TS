import { IPagination, IPaginationWithOrdering, ISimpleBehavior } from "../types/common";
import { IQueryBuilder, IQueryParameters, IQueryParametersFilterBy, IQueryParametersInclude } from "../types/common";
import Rawg from "./rawg";

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
    public buildPagination() {
        return {
            page: this.query.page,
            page_size: this.query.page_size
        }
    }
}
