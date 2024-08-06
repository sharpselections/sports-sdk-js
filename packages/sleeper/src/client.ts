import {
    Draft,
    DraftPick,
    LeagueInfo,
    Matchup, Player, PlayerDraftPick,
    PlayoffMatchup,
    Roster,
    State,
    Transaction, TrendingPlayer,
    User,
    UserInfo
} from "./types.ts";
import {Sport, SportsSdkClient} from "@sports-sdk/core";

export const SleeperClientSportsList = [
    Sport.NBA,
    Sport.NFL,
    Sport.EPL,
    "LALIGA"
] as const;

export type SleeperClientSports = typeof SleeperClientSportsList[number];

export class SleeperClient<S extends SleeperClientSports> extends SportsSdkClient {
    readonly sportMappings: { [K in S]: string } = {
        [Sport.EPL]: "clubsoccer:epl",
        [Sport.NBA]: "nba",
        [Sport.NFL]: "nfl",
        // will add LALIGA to core sports if/when it is more widely supported
        "LALIGA": "clubsoccer:laliga",
    } as { [K in S]: string };

    constructor(protected readonly sport: S) {
        super("https://api.sleeper.app/v1");
    }

    /**
     * Sends a GET request to the specified URL path.
     * @param path - The path to append to base URL to send the request to.
     * @returns The response data from the API
     * @throws Will throw an error if the request fails.
     */
    private async request<T>({path}: { path: string }): Promise<T> {
        const response = await this.session.get(path);

        if (response.status === 200) {
            return response.data as T;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }


    /**
     * Lookup the current state for the sport. The state consists of the current week in the league, season start date, current season, current week, etc.
     * @returns The current state of the sport.
     */
    async stateLookup(): Promise<State> {
        const path = "/state/" + this.sportMappings[this.sport];
        return await this.request<State>({path});
    }

    /**
     * Lookup the user. This call is useful to determine the user ID for a given username. Usernames can change, but user IDs will not.
     * @param user - The username to lookup.
     * @returns The user details.
     */
    async userLookup(user: string): Promise<User> {
        const path = "/user/" + user;
        return await this.request<User>({path});
    }

    /**
     * Lookup the leagues a user is in.
     * @param user - The user to lookup leagues for.
     * @param season - The season to lookup leagues for.
     * @returns The user's leagues.
     */
    async getUserLeagues({user, season}: {
        user: string,
        season: string
    }): Promise<Array<LeagueInfo>> {
        const path = `/user/${user}/leagues/${this.sportMappings[this.sport]}/${season}`;
        return await this.request<Array<LeagueInfo>>({path});
    }

    /**
     * Lookup the details for a specific league.
     * @param league - The league to lookup.
     * @returns The league details.
     */
    async getLeague(league: string): Promise<LeagueInfo> {
        const path = `/league/${league}`;
        return await this.request<LeagueInfo>({path});
    }

    /**
     * Get rosters for a specified league.
     * @param league - The league to get rosters for.
     * @returns The user's roster for the specified league.
     */
    async getLeagueRosters(league: string): Promise<Array<Roster>> {
        const path = `/league/${league}/rosters`;
        return await this.request<Array<Roster>>({path});
    }

    /**
     * Get a list of users for a specified league.
     * @param league - The league to get users for.
     * @returns The list of users for the specified league.
     */
    async getLeagueUsers(league: string): Promise<Array<UserInfo>> {
        const path = `/league/${league}/users`;
        return await this.request<Array<UserInfo>>({path});
    }

    /**
     * Get the matchup for a specified week in a specified league.
     * @param league - The league to get matchups for.
     * @param week - The week to get matchups for.
     * @returns The user's matchup for the specified week.
     */
    async getLeagueMatchups({league, week}: {
        league: string,
        week: number,
    }): Promise<Array<Matchup>> {
        const path = `/league/${league}/matchups/${week}`;
        return await this.request<Array<Matchup>>({path});
    }

    /**
     * Get a list describing the playoff bracket for a specified league.
     * @param league - The league to get the playoff bracket for.
     * @param bracket - The bracket to get the playoff bracket for.
     * @returns The playoff bracket for the specified league.
     */
    async getLeaguePlayoffBracket({league, bracket}: {
        league: string,
        bracket: string
    }): Promise<Array<PlayoffMatchup>> {
        const path = `/league/${league}/${bracket}_bracket`;
        return await this.request<Array<PlayoffMatchup>>({path});
    }

    /**
     * Get a list of all free agent transactions, waivers and trades for a specific league for a particular round.
     * @param league - The league to get transactions for.
     * @param week - The week to get transactions for.
     * @returns The list of transactions for the specified user's roster.
     */
    async getLeagueTransactions({league, week}: {
        league: string,
        week: number,
    }): Promise<Array<Transaction>> {
        const path = `/league/${league}/matchups/${week}`;
        return await this.request<Array<Transaction>>({path});
    }

    /**
     * Get a list of traded picks in a specific league.
     * @param league - The league to get traded picks for.
     * @returns The list of traded picks the user currently owns in the specified league.
     */
    async getLeagueTradedPicks(league: string): Promise<Array<DraftPick>> {
        const path = `/league/${league}/traded_picks`;
        return await this.request<Array<DraftPick>>({path});
    }

    /**
     * Get a list of details for all drafts for a specific user in season, including format and status.
     * @param user - The user to get drafts for.
     * @param sport - The sport to get drafts for.
     * @returns The list of details for all drafts for the specified user.
     */
    async getUserDraft({user, season}: {
        user: string,
        season: string
    }): Promise<Array<Draft>> {
        const path = `/user/${user}/drafts/${this.sportMappings[this.sport]}/${season}`;
        return await this.request<Array<Draft>>({path});
    }

    /**
     * Get a list of details for all drafts for a specified league, including format and status.
     * @param league - The league to get drafts for.
     * @returns The list of details for all drafts for the specified league.
     */
    async getLeagueDrafts(league: string): Promise<Array<Draft>> {
        const path = `/league/${league}/drafts`;
        return await this.request<Array<Draft>>({path});
    }

    /**
     * Get the details of a specific draft, including format, status, and order.
     * @param draft - The draft to get details for.
     * @returns The details of the specified draft.
     */
    async getDraft(draft: string): Promise<Draft> {
        const path = `/draft/${draft}`;
        return await this.request<Draft>({path});
    }

    /**
     * Get picks for a specific draft.
     * @param draft - The draft to get picks for.
     * @returns The picks for the specified user in the specified draft.
     */
    async getDraftPicks(draft: string): Promise<Array<PlayerDraftPick>> {
        const path = `/draft/${draft}/picks`;
        return await this.request<Array<PlayerDraftPick>>({path});
    }

    /**
     * Get the traded picks in a specific draft.
     * @param draft - The draft to get traded picks for.
     * @returns The traded picks currently owned by the specified user in the specified draft.
     */
    async getDraftTradedPicks(draft: string): Promise<Array<DraftPick>> {
        const path = `/draft/${draft}/traded_picks`;
        return await this.request<Array<DraftPick>>({path});
    }

    /**
     * Get all players on Sleeper for the specified sport.
     * @returns All players on Sleeper for the specified sport.
     */
    async getAllPlayers(): Promise<{ [key: string]: Player }> {
        const path = `/players/${this.sportMappings[this.sport]}`;
        return await this.request<{ [key: string]: Player }>({path});
    }

    /**
     * Get list of trending players based on their add/drop frequency within the past lookback hours.
     * @param type - The type of trending players to get (e.g., add, drop).
     * @param lookback_hours - The lookback period in hours.
     * @param limit - The maximum number of trending players to return.
     * @returns The list of trending players for the specified sport.
     */
    async getTrendingPlayers({type, lookback_hours, limit}: {
        type: string,
        lookback_hours: number,
        limit: number
    }): Promise<Array<TrendingPlayer>> {
        const path = `/players/${this.sportMappings[this.sport]}/trending/${type}?lookback_hours=${lookback_hours}&limit=${limit}`;
        return await this.request<Array<TrendingPlayer>>({path});
    }
}