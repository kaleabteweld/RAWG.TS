import axios from "axios";
import Rawg from "../../src/models/rawg";
import MockAdapter from "axios-mock-adapter";


export default class RawgMock extends Rawg {
    private rawg: Rawg;
    mockAdapter: MockAdapter;
    mockInputs: IMockInputs;

    constructor(rawg: Rawg, mockAdapter: MockAdapter, mockInputs: IMockInputs) {
        super(rawg.apiKey, rawg.baseUrl);
        this.rawg = rawg;
        this.mockAdapter = mockAdapter
        this.mockInputs = mockInputs
    }

    public async sendGetRequest<T>(endpoint: string[], params?: any, page: number = 1): Promise<T | never> {
        const url = this.appendeUrl(endpoint);
        this.mockAdapter.onGet(url).reply(this.mockInputs.status, this.mockInputs.mockData);
        return this.rawg.sendGetRequest(endpoint, params, page)
    }

}


export interface IMockInputs {
    matcher?: string | RegExp | undefined,
    mockData: any,
    status: number
}