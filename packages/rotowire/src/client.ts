import {Sport, SportsSdkClient} from "@sports-sdk/core";
import {InjuriesResponse, LineupResponse, LineupsParams, NewsResponse} from "./types.ts";
import {NewsParameters} from "./news/common.ts";

type RequestParams = {
    [key: string]: any
};

export class RotowireClient<S extends Sport> extends SportsSdkClient {
    protected readonly apiToken: string;
    static readonly sportMappings = {
        [Sport.EPL]: "/Soccer/EPL",
        [Sport.MLB]: "/Baseball/MLB",
        [Sport.NBA]: "/Basketball/NBA",
        [Sport.NCAAF]: "/Football/CFB",
        [Sport.NFL]: "/Football/NFL",
        [Sport.NHL]: "/Hockey/NHL",
    };

    /**
     * Creates a Rotowire client.
     * @param sport - The sport to get data from
     * @param apiToken - The API token for authenticating API requests. If not provided, it will look for `ROTOWIRE_TOKEN` in the environment variables.
     * @throws Will throw an error if the API token is not provided or found in the environment variables.
     */
    constructor(protected readonly sport: S, apiToken?: string) {
        super(`https://api.rotowire.com${RotowireClient.sportMappings[sport]}`);
        const token = apiToken || process.env.ROTOWIRE_TOKEN;

        if (!token) {
            throw new Error("Rotowire API token is required. Provide it as a parameter or set the environment variable ROTOWIRE_TOKEN.");
        }

        this.apiToken = token;
    }

    /**
     * Sends a GET request to the specified URL with the provided parameters.
     * @param apiPath - The path to append to the url when sending the request.
     * @param additionalParams - Additional query parameters for the request.
     * @returns The response data from the API
     * @throws Will throw an error if the request fails.
     */
    protected async request<T>({apiPath, additionalParams = {}}: {
        apiPath: string,
        additionalParams?: RequestParams
    }): Promise<T> {
        const params = {key: this.apiToken, "format": "json", ...additionalParams};
        const response = await this.session.get(apiPath, {params});

        if (response.status !== 200) {
            throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
        }
        return response.data as T;
    }

    /**
     * Retrieves news for the selected sport.
     * @supports ALL
     */
    public async getNews<T extends NewsResponse<S> = NewsResponse<S>>(params?: NewsParameters): Promise<T> {
        return this.request<T>({
            apiPath: "/News.php",
            additionalParams: params
        });
    }

    /**
     * Retrieves injuries for the selected sport.
     * @supports ALL
     */
    public async getInjuries<T extends InjuriesResponse<S> = InjuriesResponse<S>>(): Promise<T> {
        return this.request<T>({
            apiPath: "/Injuries.php",
        });
    }

    /**
     * Retrieves lineups for the selected sport.
     * @supports NBA, MLB, EPL
     */
    public async getLineups<T extends LineupResponse<S> = LineupResponse<S>>(params?: LineupsParams<S>): Promise<T> {
        if (this.sport !== Sport.NBA && this.sport !== Sport.MLB && this.sport !== Sport.EPL) {
            throw new Error("Only NBA, MLB, & EPL are supported!");
        }
        return this.request<T>({
            apiPath: `/${this.sport === Sport.MLB ? "Expected" : ""}Lineups.php`,
            additionalParams: params
        });
    }
}
