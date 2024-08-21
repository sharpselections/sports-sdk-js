import {
    FantasyProsClientLeague, GetRankingsParameters, RankingsResponse, RankingsWithScoringProps,
} from "./types.ts";
import {League, SportsSdkClient} from "@sports-sdk/core";

export interface RequestParams {
    [key: string]: any;
}

export class FantasyProsClient<S extends FantasyProsClientLeague> extends SportsSdkClient {
    protected readonly apiKey: string;

    /**
     * Create a FantasyPros API client
     * @param league - The league to get data from
     * @param apiKey - The API key for authenticating API requests. If not provided, it will look for `FANTASY_PROS_KEY` in the environment variables.
     * @throws Will throw an error if the API key is not provided or found in the environment variables.
     */
    constructor(protected readonly league: S, apiKey?: string) {
        super("https://api.fantasypros.com/v2/json");
        const key = apiKey || process.env.FANTASY_PROS_KEY;
        if (!key) {
            throw new Error("FantasyPros API key is required. Provide it as a parameter or set the environment variable FANTASY_PROS_KEY.");
        }
        this.session.defaults.headers.common["x-api-key"] = key;
        this.apiKey = key;
    }

    private isMlb(): this is FantasyProsClient<League.MLB> {
        return this.league as League === League.MLB;
    }

    private isNfl(): this is FantasyProsClient<League.NFL> {
        return this.league as League === League.NFL;
    }

    /**
     * Sends a GET request to the specified URL path.
     * @param path - The path to append to base URL to send the request to.
     * @param additionalParams - Additional query parameters for the request.
     * @returns The response data from the API
     * @throws Will throw an error if the request fails.
     */
    private async request<T>({path, additionalParams = {}}: {
        additionalParams?: RequestParams,
        path: string
    }): Promise<T> {
        const response = await this.session.get(path, {
            params: additionalParams,
        });

        if (response.status === 200) {
            return response.data as T;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }


    /**
     * Lookup the current state for the sport. The state consists of the current week in the league, season start date, current season, current week, etc.
     * @returns The current state of the sport.
     */
    async getRankings(params: GetRankingsParameters<S>): Promise<RankingsResponse> {
        const {
            season,
            position = this.isNfl() ? "OP" : "ALL",
            rankingsType,
            showExperts,
            specificExperts,
            week,
        } = params;

        const additionalParams: RequestParams = {
            position,
            ...(rankingsType && {type: rankingsType}),
            ...(showExperts && {experts: "show"}),
            ...(specificExperts?.length && {filters: specificExperts.join(":")}),
            ...(week && {week}),
            ...(!this.isMlb() && (params as RankingsWithScoringProps<S>).scoring &&
                {scoring: (params as RankingsWithScoringProps<S>).scoring}
            ),
        };
        return await this.request<RankingsResponse>({
            path: `/${this.league.toLowerCase()}/${season}/consensus-rankings`,
            additionalParams,
        });
    }
}