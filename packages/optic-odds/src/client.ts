import {RequestParams, League, SportsSdkClient} from "@sports-sdk/core";
import {
    BaseEntity,
    BaseResponse, FixtureEntity, FixtureOdds, FixturePlayerResults, FixtureTeamResults,
    FutureEntity,
    FutureOdds, GetFixtureResultsProps,
    GetFixturesPlayerResultsProps, GetFixturesProps,
    GetFuturesOddsProps,
    GetFuturesProps, GetH2HResultsProps, GetInjuriesProps,
    GetLeaguesProps,
    GetMarketsProps, GetOddsProps,
    GetPlayersProps, GetPlayersResultsProps,
    GetSportsbooksProps,
    GetTeamsProps,
    LeagueEntity,
    MarketsEntity, PaginatedResponse, PlayerEntity,
    PlayerInjuryEntity,
    SportsbookEntity,
    TeamEntity
} from "./types.ts";

export class OpticOddsClient extends SportsSdkClient {
    protected readonly apiKey: string;

    /**
     * Create a OpticOdds API client
     * @param apiKey - The API key for authenticating API requests. If not provided, it will look for `OPTIC_ODDS_KEY` in the environment variables.
     * @throws Will throw an error if the API key is not provided or found in the environment variables.
     */
    constructor(apiKey?: string) {
        super("https://api.opticodds.com/api/v3");
        const key = apiKey || process.env.OPTIC_ODDS_KEY;
        if (!key) {
            throw new Error("OpticOdds API key is required. Provide it as a parameter or set the environment variable OPTIC_ODDS_KEY.");
        }
        this.session.defaults.headers.common["X-Api-Key"] = key;
        this.apiKey = key;
    }

    public static coreLeagueToOpticLeague(league: League){
        if (league === League.EPL){
            return "england_-_premier_league";
        }
        return league.toLowerCase();
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
        const params = Object.entries(additionalParams).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
                // Handle array by appending each value with the same key
                value.forEach((val) => {
                    acc.append(key, val);
                });
            } else {
                acc.append(key, value);
            }
            return acc;
        }, new URLSearchParams());
        const response = await this.session.get(path, {
            params,
        });

        if (response.status === 200) {
            return response.data as T;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }

    public async getFixtures(props: GetFixturesProps) {
        const {active, ...additionalParams} = props;
        return await this.request<PaginatedResponse<FixtureEntity>>({
            path: "/fixtures" + (active ? "/active" : ""),
            additionalParams,
        })
    }

    public async getOdds(props: GetOddsProps) {
        return await this.request<BaseResponse<FixtureOdds>>({
            path: "/fixtures/odds",
            additionalParams: props,
        })
    }

    public async getFixturesPlayerResults(props: GetFixturesPlayerResultsProps) {
        return await this.request<BaseResponse<FixturePlayerResults>>({
            path: "/fixtures/player-results",
            additionalParams: props,
        })
    }

    public async getPlayerResults(props: GetPlayersResultsProps) {
        return await this.request<BaseResponse<FixturePlayerResults>>({
            path: "/fixtures/player-results/last-x",
            additionalParams: props,
        })
    }

    public async getFixtureResults(props: GetFixtureResultsProps) {
        return await this.request<BaseResponse<FixtureTeamResults>>({
            path: "/fixtures/results",
            additionalParams: props,
        })
    }

    public async getH2HResults(props: GetH2HResultsProps) {
        return await this.request<BaseResponse<FixtureTeamResults>>({
            path: "/fixtures/results/head-to-head",
            additionalParams: props,
        })
    }

    public async getFutures(props: GetFuturesProps) {
        return await this.request<BaseResponse<FutureEntity>>({
            path: "/futures",
            additionalParams: props,
        })
    }

    public async getFuturesOdds(props: GetFuturesOddsProps) {
        return await this.request<BaseResponse<FutureOdds>>({
            path: "/futures/odds",
            additionalParams: props,
        })
    }

    public async getInjuries(props: GetInjuriesProps) {
        return await this.request<BaseResponse<PlayerInjuryEntity>>({
            path: "/injuries",
            additionalParams: props,
        })
    }

    public async getLeagues(props: GetLeaguesProps) {
        const {active, ...additionalParams} = props;
        return await this.request<BaseResponse<LeagueEntity>>({
            path: `/leagues${active ? "/active" : ""}`,
            additionalParams
        })
    }

    public async getMarkets(props: GetMarketsProps) {
        return await this.request<BaseResponse<MarketsEntity>>({
            path: "/markets",
            additionalParams: props,
        })
    }

    public async getPlayers(props: GetPlayersProps) {
        return await this.request<PaginatedResponse<PlayerEntity>>({
            path: "/players",
            additionalParams: props,
        })
    }

    public async getSports(active = false) {
        return await this.request<BaseResponse<BaseEntity & { main_markets?: Array<BaseEntity> | null }>>({
            path: "/sports" + (active ? "/active" : ""),
        })
    }

    public async getSportsbooks(props?: GetSportsbooksProps) {
        return await this.request<BaseResponse<SportsbookEntity>>({
            path: "/sportsbooks" + (props ? "/active" : ""),
            additionalParams: props,
        })
    }

    public async getTeams(props: GetTeamsProps) {
        return await this.request<PaginatedResponse<TeamEntity>>({
            path: "/teams",
            additionalParams: props,
        })
    }
}