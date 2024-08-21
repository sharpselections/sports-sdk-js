import {League, SportsSdkClient} from "@sports-sdk/core";
import {DepthChartsResponse, NewsResponse, PlayersResponse, TeamsResponse} from "./responses/common.ts";
import {
    AuctionValues,
    AuctionValuesParams,
    DraftProjections,
    DraftRankings,
    DraftRankingsParams,
    FantasyLeadersParams,
    Injuries,
    Lineups,
    LineupsParams,
    PlayerRater,
    PlayersParams,
    RequestParams,
    Schedule,
    Weather,
    WeeklyProjectionsParams
} from "./types.ts";
import {
    NFLByesResponse,
    NFLDefensiveRanksResponse,
    NFLDraftRankingsResponseSchema,
    NFLFantasyLeadersResponse,
    NFLPicksResponse,
    NFLPlayerADPResponse,
    NFLPlayoffProjectionsResponse,
    NFLRankingsResponse,
    NFLROSProjectionsResponse,
    NFLWeeklyProjectionsResponse,
    NFLWeeklyRankingsResponse
} from "./responses/nfl.ts";
import {ZodObject} from "zod";
import {NBADraftRankingsResponseSchema} from "./responses/nba.ts";
import {MLBDraftRankingsResponseSchema} from "./responses/mlb.ts";

export class FantasyNerdsClient<T extends League.NFL | League.NBA | League.MLB> extends SportsSdkClient {
    protected readonly apiToken: string;

    /**
     * Creates a Fantasy Nerds client.
     * @param league - The sport to get data from
     * @param apiToken - The API token for authenticating API requests. If not provided, it will look for `FANTASY_NERDS_KEY` in the environment variables.
     * @throws Will throw an error if the API key is not provided or found in the environment variables.
     */
    constructor(protected readonly league: T, apiToken?: string) {
        super(`https://api.fantasynerds.com/v1/${league.toLowerCase()}`);
        const token = apiToken || process.env.FANTASY_NERDS_KEY;

        if (!token) {
            throw new Error("Fantasy Nerds API key is required. Provide it as a parameter or set the environment variable FANTASY_NERDS_KEY.");
        }

        this.apiToken = token;
    }

    /**
     * Sends a GET request to the specified URL with the provided parameters.
     * @param apiPath - The path to append to the URL when sending the request.
     * @param additionalParams - Additional query parameters for the request.
     * @param parser - Optional ZodObject to parse the response data before returning it as T
     * @returns The response data from the API.
     * @throws Will throw an error if the request fails.
     */
    protected async request<T>({apiPath, additionalParams = {}, parser}: {
        additionalParams?: RequestParams,
        apiPath: string,
        parser?: ZodObject<any>
    }): Promise<T> {
        const params = {apikey: this.apiToken, ...additionalParams};
        const response = await this.session.get(apiPath, {params});

        if (response.status !== 200) {
            throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
        }
        const result = parser?.parse(response.data) ?? response.data;
        return result as T;
    }

    /**
     * Retrieves depth charts for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getDepthCharts(): Promise<DepthChartsResponse> {
        return this.request<DepthChartsResponse>({apiPath: "/depth"});
    }

    /**
     * Retrieves draft projections for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getDraftProjections(): Promise<DraftProjections<T>> {
        return this.request<DraftProjections<T>>({apiPath: "/draft-projections"});
    }

    /**
     * Retrieves draft rankings for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getDraftRankings(params?: DraftRankingsParams): Promise<DraftRankings<T>> {
        // Abstract this out to be more generic if this pattern is more widely needed
        const parser = this.league === League.NFL ? NFLDraftRankingsResponseSchema :
            this.league === League.NBA ? NBADraftRankingsResponseSchema :
                MLBDraftRankingsResponseSchema
        return this.request<DraftRankings<T>>({
            apiPath: "/draft-rankings",
            additionalParams: params,
            parser
        });
    }


    /**
     * Retrieves news for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getNews(): Promise<NewsResponse> {
        return this.request<NewsResponse>({apiPath: "/news"});
    }

    /**
     * Retrieves schedule for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getSchedule(): Promise<Schedule<T>> {
        return this.request<Schedule<T>>({apiPath: "/schedule"});
    }

    /**
     * Retrieves teams for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getTeams(): Promise<TeamsResponse> {
        return this.request<TeamsResponse>({apiPath: "/teams"});
    }

    /**
     * Retrieves players for the selected sport.
     * @supports NFL, NBA, MLB
     */
    public async getPlayers(params?: PlayersParams): Promise<PlayersResponse> {
        return this.request<PlayersResponse>({
            apiPath: "/players",
            additionalParams: params
        });
    }

    /**
     * Retrieves lineups for NBA or MLB.
     * @supports NBA, MLB
     */
    public async getLineups(params?: LineupsParams): Promise<Lineups<T>> {
        if (this.league !== League.NBA && this.league !== League.MLB) {
            throw new Error("Lineups are only available for NBA and MLB.");
        }
        return this.request<Lineups<T>>({
            apiPath: "/lineups",
            additionalParams: params
        });
    }

    /**
     * Retrieves player rater for NBA or MLB.
     * @supports NBA, MLB
     */
    public async getPlayerRater(): Promise<PlayerRater<T>> {
        if (this.league !== League.NBA && this.league !== League.MLB) {
            throw new Error("Player Rater is only available for NBA and MLB.");
        }
        return this.request<PlayerRater<T>>({apiPath: "/player-rater"});
    }

    /**
     * Retrieves auction values for NFL or MLB.
     * @supports NFL, MLB
     */
    public async getAuctionValues(params?: AuctionValuesParams): Promise<AuctionValues<T>> {
        if (this.league !== League.NFL && this.league !== League.MLB) {
            throw new Error("Auction Values are only available for NFL and MLB.");
        }
        return this.request<AuctionValues<T>>({
            apiPath: "/auction",
            additionalParams: params
        });
    }

    /**
     * Retrieves weather forecasts for NFL or MLB.
     * @supports NFL, MLB
     */
    public async getWeatherForecasts(): Promise<Weather<T>> {
        if (this.league !== League.NFL && this.league !== League.MLB) {
            throw new Error("Weather Forecasts are only available for NFL and MLB.");
        }
        return this.request<Weather<T>>({apiPath: "/weather"});
    }

    /**
     * Retrieves average draft position (ADP) for NFL.
     * @supports NFL
     */
    public async getAverageDraftPosition(params?: RequestParams): Promise<NFLPlayerADPResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Average Draft Position is only available for NFL.");
        }
        return this.request<NFLPlayerADPResponse>({
            apiPath: "/adp",
            additionalParams: params
        });
    }

    /**
     * Retrieves best ball rankings for NFL.
     * @supports NFL
     */
    public async getBestBallRankings(): Promise<NFLRankingsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Best Ball Rankings are only available for NFL.");
        }
        return this.request<NFLRankingsResponse>({apiPath: "/bestball"});
    }

    /**
     * Retrieves bye weeks for NFL.
     * @supports NFL
     */
    public async getByeWeeks(): Promise<NFLByesResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Bye Weeks are only available for NFL.");
        }
        return this.request<NFLByesResponse>({apiPath: "/byes"});
    }

    /**
     * Retrieves defensive rankings for NFL.
     * @supports NFL
     */
    public async getDefensiveRanks(): Promise<NFLDefensiveRanksResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Defensive Ranks are only available for NFL.");
        }
        return this.request<NFLDefensiveRanksResponse>({apiPath: "/defense-rankings"});
    }

    /**
     * Retrieves dynasty rankings for NFL.
     * @supports NFL
     */
    public async getDynastyRankings(): Promise<NFLRankingsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Dynasty Rankings are only available for NFL.");
        }
        return this.request<NFLRankingsResponse>({apiPath: "/dynasty"});
    }

    /**
     * Retrieves fantasy leaders for NFL.
     * @supports NFL
     */
    public async getFantasyLeaders(params?: FantasyLeadersParams): Promise<NFLFantasyLeadersResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Fantasy Leaders are only available for NFL.");
        }
        return this.request<NFLFantasyLeadersResponse>({
            apiPath: "/leaders",
            additionalParams: params
        });
    }

    /**
     * Retrieves injury reports for NFL or NBA.
     * @supports NFL, NBA
     */
    public async getInjuryReports(): Promise<Injuries<T>> {
        if (this.league !== League.NFL && this.league !== League.NBA) {
            throw new Error("Injury Reports are only available for NFL & NBA.");
        }
        return this.request<Injuries<T>>({apiPath: "/injuries"});
    }

    /**
     * Retrieves NFL picks.
     * @supports NFL
     */
    public async getNflPicks(): Promise<NFLPicksResponse> {
        if (this.league !== League.NFL) {
            throw new Error("NFL Picks are only available for NFL.");
        }
        return this.request<NFLPicksResponse>({apiPath: "/nfl-picks"});
    }

    /**
     * Retrieves playoff projections for NFL.
     * @supports NFL
     */
    public async getPlayoffProjections(params?: RequestParams): Promise<NFLPlayoffProjectionsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Playoff Projections are only available for NFL.");
        }
        return this.request<NFLPlayoffProjectionsResponse>({
            apiPath: "/playoffs",
            additionalParams: params
        });
    }

    /**
     * Retrieves rest of season projections for NFL.
     * @supports NFL
     */
    public async getRestOfSeasonProjections(): Promise<NFLROSProjectionsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Rest of Season Projections are only available for NFL.");
        }
        return this.request<NFLROSProjectionsResponse>({apiPath: "/ros"});
    }

    /**
     * Retrieves weekly projections for NFL.
     * @supports NFL
     */
    public async getWeeklyProjections(params: WeeklyProjectionsParams): Promise<NFLWeeklyProjectionsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Weekly Projections are only available for NFL.");
        }
        return this.request<NFLWeeklyProjectionsResponse>({
            apiPath: "/weekly-projections",
            additionalParams: params
        });
    }

    /**
     * Retrieves weekly rankings for NFL.
     * @supports NFL
     */
    public async getWeeklyRankings(params?: DraftRankingsParams): Promise<NFLWeeklyRankingsResponse> {
        if (this.league !== League.NFL) {
            throw new Error("Weekly Rankings are only available for NFL.");
        }
        return this.request<NFLWeeklyRankingsResponse>({
            apiPath: "/weekly-rankings",
            additionalParams: params
        });
    }
}
