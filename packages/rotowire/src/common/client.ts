import {Sport, SportsSdkClient} from "@sports-sdk/core";
import {NewsParameters} from "./news";
import {MLBInjuriesResponse, MLBNewsResponse} from "../baseball";
import {NCAAFInjuriesResponse, NCAAFNewsResponse, NFLInjuriesResponse, NFLNewsResponse} from "../football";
import {EPLInjuriesResponse, EPLNewsResponse} from "../soccer";
import {NBAInjuriesResponse, NBANewsResponse} from "../basketball";
import {NHLInjuriesResponse, NHLNewsResponse} from "../hockey";
import {MLBLineupsParameters, MLBLineupsResponse} from "../baseball";
import {SoccerLineupsParameters, SoccerLineupsResponse} from "../soccer";
import {NBALineupsParameters, NBALineupsResponse} from "../basketball";

type RequestParams = {
    [key: string]: any
};

export type NewsResponse =
    MLBNewsResponse
    | NFLNewsResponse
    | NCAAFNewsResponse
    | EPLNewsResponse
    | NBANewsResponse
    | NHLNewsResponse;

export type InjuriesResponse =
    MLBInjuriesResponse
    | NFLInjuriesResponse
    | NCAAFInjuriesResponse
    | EPLInjuriesResponse
    | NBAInjuriesResponse
    | NHLInjuriesResponse;

export type LineupsParams = MLBLineupsParameters | SoccerLineupsParameters | NBALineupsParameters;
export type LineupResponse = MLBLineupsResponse | SoccerLineupsResponse | NBALineupsResponse;

export class RotowireClient extends SportsSdkClient {
    protected readonly apiToken: string;
    protected readonly sportMappings = {
        [Sport.EPL]: "/Soccer/EPL",
        [Sport.MLB]: "/Baseball/MLB",
        [Sport.NBA]: "/Basketball/NBA",
        [Sport.NCAAF]: "/Football/CFB",
        [Sport.NFL]: "/Football/NFL",
        [Sport.NHL]: "/Hockey/NHL",
    };

    /**
     * Creates a Rotowire client.
     * @param apiToken - The API token for authenticating API requests. If not provided, it will look for `ROTOWIRE_TOKEN` in the environment variables.
     * @throws Will throw an error if the API token is not provided or found in the environment variables.
     */
    constructor(apiToken?: string) {
        super("https://api.rotowire.com");
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

    protected async genericGetNews<T extends NewsResponse>({sport, params}: { sport: Sport, params?: NewsParameters }): Promise<T> {
        return this.request<T>({
            apiPath: `${this.sportMappings[sport]}/News.php`,
            additionalParams: params
        });
    }

    protected async genericGetInjuries<T extends InjuriesResponse>({sport}: { sport: Sport }): Promise<T> {
        return this.request<T>({
            apiPath: `${this.sportMappings[sport]}/Injuries.php`,
        });
    }

    protected async genericGetLineups<T extends LineupResponse>({sport, params}: { sport: Sport, params?: LineupsParams }): Promise<T> {
        if (sport !== Sport.NBA && sport !== Sport.MLB && sport !== Sport.EPL) {
            throw new Error("Only NBA, MLB, & EPL are supported!");
        }
        return this.request<T>({
            apiPath: `${this.sportMappings[sport]}/${sport === Sport.MLB ? "Expected" : ""}Lineups.php`,
            additionalParams: params
        });
    }
}

export interface RotowireClient {
    getNews(params: any): Promise<any>;
    getInjuries(params: any): Promise<any>;
    getLineups(params: any): Promise<any>;
}