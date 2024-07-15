import {Sport, SportsSdkClient} from "@sports-sdk/core";
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

export class SleeperClient extends SportsSdkClient {
    constructor() {
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
     * Lookup the current state for a given sport. The state consists of the current week in the league, season start date, current season, current week, etc.
     * @param sport - The sport to lookup the state for.
     * @returns The current state of the sport.
     */
    async stateLookup({sport}: { sport: Extract<Sport, Sport.NBA | Sport.NFL> }): Promise<State> {
        const path = "/state/" + sport.toLowerCase();
        return await this.request<State>({path});
    }

    /**
     * Lookup the user. This call is useful to determine the user ID for a given username. Usernames can change, but user IDs will not.
     * @param user - The username to lookup.
     * @param uiStream - The UI stream for updates.
     * @param sharpUser - The sharp user object to update.
     * @returns The user details.
     */
    async userLookup({user}: { user: string }): Promise<User> {
        const path = "/user/" + user;
        return await this.request<User>({path});
    }

    /**
     * Lookup the leagues a user is in.
     * @param user - The user to lookup leagues for.
     * @param sport - The sport to lookup leagues for.
     * @param season - The season to lookup leagues for.
     * @returns The user's leagues.
     */
    async getUserLeagues({user, sport, season}: {
        user: string,
        sport: Extract<Sport, Sport.NBA | Sport.NFL>,
        season: string
    }): Promise<Array<LeagueInfo>> {
        const path = `/user/${user}/leagues/${sport.toLowerCase()}/${season}`;
        return await this.request<Array<LeagueInfo>>({path});
    }

    /**
     * Lookup the details for a specific league.
     * @param league - The league to lookup.
     * @returns The league details.
     */
    async getLeague({league}: { league: string }): Promise<LeagueInfo> {
        const path = `/league/${league}`;
        return await this.request<LeagueInfo>({path});
    }

    /**
     * Get a user's roster for a specified league.
     * @param league - The league to get rosters for.
     * @param user - The user to get rosters for.
     * @returns The user's roster for the specified league.
     */
    async getLeagueRosters({league, user}: { league: string, user: string }): Promise<Array<Roster>> {
        const path = `/league/${league}/rosters`;
        return await this.request<Array<Roster>>({path});
    }

    /**
     * Get a list of users for a specified league.
     * @param league - The league to get users for.
     * @returns The list of users for the specified league.
     */
    async getLeagueUsers({league}: { league: string }): Promise<Array<UserInfo>> {
        const path = `/league/${league}/users`;
        return await this.request<Array<UserInfo>>({path});
    }

    /**
     * Using the user's roster ID, get the user's matchup for a specified week in a specified league.
     * @param league - The league to get matchups for.
     * @param week - The week to get matchups for.
     * @param roster - The roster ID of the user.
     * @returns The user's matchup for the specified week.
     */
    async getLeagueMatchups({league, week, roster}: {
        league: string,
        week: number,
        roster: string
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
     * Get a list of all free agent transactions, waivers and trades for a specific user's roster in a specified league for a particular round.
     * @param league - The league to get transactions for.
     * @param week - The week to get transactions for.
     * @param roster - The roster ID of the user.
     * @returns The list of transactions for the specified user's roster.
     */
    async getLeagueTransactions({league, week, roster}: {
        league: string,
        week: number,
        roster: string
    }): Promise<Array<Transaction>> {
        const path = `/league/${league}/matchups/${week}`;
        return await this.request<Array<Transaction>>({path});
    }

    /**
     * Get a list of traded picks a specified user currently owns in a specific league.
     * @param league - The league to get traded picks for.
     * @param user - The user to get traded picks for.
     * @returns The list of traded picks the user currently owns in the specified league.
     */
    async getLeagueTradedPicks({league, user}: { league: string, user: string }): Promise<Array<DraftPick>> {
        const path = `/league/${league}/traded_picks`;
        return await this.request<Array<DraftPick>>({path});
    }

    /**
     * Get a list of details for all drafts for a specific user in a particular sport and season, including format and status.
     * @param user - The user to get drafts for.
     * @param sport - The sport to get drafts for.
     * @param season - The season to get drafts for.
     * @returns The list of details for all drafts for the specified user.
     */
    async getUserDraft({user, sport, season}: {
        user: string,
        sport: Extract<Sport, Sport.NBA | Sport.NFL>,
        season: string
    }): Promise<Array<Draft>> {
        const path = `/user/${user}/drafts/${sport.toLowerCase()}/${season}`;
        return await this.request<Array<Draft>>({path});
    }

    /**
     * Get a list of details for all drafts for a specified league, including format and status.
     * @param league - The league to get drafts for.
     * @returns The list of details for all drafts for the specified league.
     */
    async getLeagueDrafts({league}: { league: string }): Promise<Array<Draft>> {
        const path = `/league/${league}/drafts`;
        return await this.request<Array<Draft>>({path});
    }

    /**
     * Get the details of a specific draft, including format, status, and order.
     * @param draft - The draft to get details for.
     * @returns The details of the specified draft.
     */
    async getDraft({draft}: { draft: string }): Promise<Draft> {
        const path = `/draft/${draft}`;
        return await this.request<Draft>({path});
    }

    /**
     * Get picks for a specific user via their roster ID in a specific draft.
     * @param draft - The draft to get picks for.
     * @param roster - The roster ID of the user.
     * @returns The picks for the specified user in the specified draft.
     */
    async getDraftPicks({draft, roster}: { draft: string, roster: string }): Promise<Array<PlayerDraftPick>> {
        const path = `/draft/${draft}/picks`;
        return await this.request<Array<PlayerDraftPick>>({path});
    }

    /**
     * Get the traded picks currently owned by a specific user via their roster ID in a specific draft.
     * @param draft - The draft to get traded picks for.
     * @param roster - The roster ID of the user.
     * @returns The traded picks currently owned by the specified user in the specified draft.
     */
    async getDraftTradedPicks({draft, roster}: { draft: string, roster: string }): Promise<Array<DraftPick>> {
        const path = `/draft/${draft}/traded_picks`;
        return await this.request<Array<DraftPick>>({path});
    }

    /**
     * Get all players on Sleeper for the specified sport.
     * @param sport - The sport to get all players for.
     * @returns All players on Sleeper for the specified sport.
     */
    async getAllPlayers({sport}: { sport: Extract<Sport, Sport.NBA | Sport.NFL> }): Promise<{ [key: string]: Player }> {
        const path = `/players/${sport.toLowerCase()}`;
        return await this.request<{ [key: string]: Player }>({path});
    }

    /**
     * Get list of trending players based on their add/drop frequency within the past lookback hours.
     * @param sport - The sport to get trending players for.
     * @param type - The type of trending players to get (e.g., add, drop).
     * @param lookback_hours - The lookback period in hours.
     * @param limit - The maximum number of trending players to return.
     * @returns The list of trending players for the specified sport.
     */
    async getTrendingPlayers({sport, type, lookback_hours, limit}: {
        sport: Extract<Sport, Sport.NBA | Sport.NFL>,
        type: string,
        lookback_hours: number,
        limit: number
    }): Promise<Array<TrendingPlayer>> {
        const path = `/players/${sport.toLowerCase()}/trending/${type}?lookback_hours=${lookback_hours}&limit=${limit}`;
        return await this.request<Array<TrendingPlayer>>({path});
    }
}