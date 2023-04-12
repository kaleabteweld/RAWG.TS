import axios from "axios";
import { isPaginatedResponse } from "../util"
import { IPaginatedResponse } from "../types/common";
export default class Rawg {
    public apiKey: string;
    public baseUrl: string;
    public enterPoint: string;

    constructor(apiKey: string, baseUrl?: string, enterPoint?: string) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl ?? "https://api.rawg.io";
        this.enterPoint = enterPoint ?? "api";
    }

    public async sendGetRequest<T>(endpoint: string[], params?: any, page: number = 1): Promise<T | never> {

        const url = this.appendeUrl(endpoint);

        try {
            const response = await axios.get(url, {
                params: {
                    key: this.apiKey,
                    ...params,
                    page,
                }
            });
            if (isPaginatedResponse(response.data)) {
                return (response.data as IPaginatedResponse<T>).results;
            }
            else {
                return response.data as T
            }

        } catch (error) {
            // console.log("[-] sendGetRequest ", error)
            throw error;
        }
    }

    protected appendeUrl(endpoint: string[], baseUrl?: string, enterPoint?: string): string {
        baseUrl ??= this.baseUrl;
        enterPoint ??= this.enterPoint;

        const url = new URL(baseUrl);
        url.pathname = enterPoint;

        endpoint.forEach((e) => {
            e = e.replace("/", "");
            e = e.replace("\\", "");
            e = "/" + e;
            url.pathname += e;
        });
        return url.toString();
    }
}