import {
    LeaguePlayerInfoMap,
    LeaguePlayerStatsMap,
    LeagueScheduleMap,
    LeagueTeamInfoMap,
    LeagueTeamStatsMap,
} from "./types";
import {League, SportsSdkClient} from "@sports-sdk/core";
import axios from "axios";

/**
 * Type for additional parameters used in API requests.
 */
type AdditionalParams = {
    [key: string]: any;
    game_id?: string;
    player_id?: string;
    team_id?: string;
};

export class RollingInsightsClient extends SportsSdkClient {
    protected readonly rscToken: string;
    private leaguesMap = {
        [League.EPL]: "EPL",
        [League.MLB]: "MLB",
        [League.NBA]: "NBA",
        [League.NFL]: "NFL",
        [League.NCAAF]: "NCAAFB",
        [League.NHL]: "NHL",
    }

    /**
     * Creates a  Rolling Insights client.
     * @param rscToken - The RSC token for authenticating API requests. If not provided, it will look for `DATA_FEEDS_RSC_TOKEN` in the environment variables.
     * @throws Will throw an error if the RSC token is not provided or found in the environment variables.
     */
    constructor(rscToken?: string) {
        const endpoint = "http://rest.datafeeds.rolling-insights.com/api/v1";
        const session = axios.create({
            baseURL: endpoint,
            headers: {
                "Content-Type": "application/json",
            },
            validateStatus: function (status) {
                // Rolling Insights returns 304 fairly often, need to be able to handle it
                return status < 300 || status == 304;
            },
        });
        super(endpoint, session);
        const token = rscToken || process.env.DATA_FEEDS_RSC_TOKEN;

        if (!token) {
            throw new Error("RSC token is required. Provide it as a parameter or set the environment variable DATA_FEEDS_RSC_TOKEN.");
        }

        this.rscToken = token;
    }


    /**
     * Sends a GET request to the specified URL with the provided parameters.
     * @param url - The URL to send the request to.
     * @param additionalParams - Additional query parameters for the request.
     * @param league - The league to extract from the response.
     * @returns The response data from the API or undefined if the API returns 304
     * @throws Will throw an error if the request fails.
     */
    private async request<T>(url: string, additionalParams: AdditionalParams = {}, league?: League): Promise<T | undefined> {
        const {team_id, player_id} = additionalParams;

        // Handle cases where both team_id and player_id are provided
        if (team_id && player_id) {
            throw new Error("Both team_id and player_id cannot be provided simultaneously.");
        }

        const params = {RSC_token: this.rscToken, ...additionalParams};
        const response = await this.session.get(`${url}?${Date.now()}`, {params});

        if (response.status === 200) {
            return league ? response.data.data[this.leaguesMap[league]] as T : response.data.data as T;
        }
        if (response.status === 304) {
            return undefined;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }

    /**
     * Builds the API path with optional date and leagues parameters.
     * @param basePath - The base path of the API endpoint.
     * @param date - Optional date parameter.
     * @param leagues - Optional array of leagues or a single league.
     * @returns The constructed API path.
     */
    private buildApiPath(basePath: string, date?: string, leagues?: League[] | League): string {
        let apiPath = basePath;
        if (date) apiPath += `/${date}`;
        if (leagues) {
            if (Array.isArray(leagues)) {
                apiPath += `/${leagues.map(league => this.leaguesMap[league]).join("-")}`;
            } else {
                apiPath += `/${this.leaguesMap[leagues]}`;
            }
        }
        return apiPath;
    }

    /**
     * Builds additional parameters for API requests.
     * @param teamId - Optional team ID parameter.
     * @param gameId - Optional game ID parameter.
     * @param playerId - Optional player ID parameter.
     * @returns The constructed additional parameters.
     */
    private buildAdditionalParams(teamId?: string, gameId?: string, playerId?: string): AdditionalParams {
        const additionalParams: AdditionalParams = {};
        if (teamId) additionalParams.team_id = teamId;
        if (gameId) additionalParams.game_id = gameId;
        if (playerId) additionalParams.player_id = playerId;
        return additionalParams;
    }

    /**
     * Fetches the season schedule data.
     * @param params - Object containing optional date, league, and teamId parameters.
     * @returns The season schedule data.
     */
    public async getSeasonSchedule({date, league, teamId}: {
        date?: string,
        league: League,
        teamId?: string,
    }): Promise<Array<LeagueScheduleMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/schedule-season", date, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return await this.request<Array<LeagueScheduleMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches the weekly schedule data.
     * @param params - Object containing optional date, league, and teamId parameters.
     * @returns The weekly schedule data.
     * @refreshable
     */
    public async getWeeklySchedule({date = "now", league, teamId}: {
        date?: string,
        league: League,
        teamId?: string,
    }): Promise<Array<LeagueScheduleMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/schedule-week", date, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return await this.request<Array<LeagueScheduleMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches the daily schedule data.
     * @param params - Object containing optional date, league, teamId, and gameId parameters.
     * @returns The daily schedule data.
     * @refreshable
     */
    public async getDailySchedule({date = "now", league, teamId, gameId}: {
        date?: string,
        gameId?: string,
        league?: League,
        teamId?: string
    }): Promise<any> {
        const apiPath = this.buildApiPath("/schedule", date, league);
        const additionalParams = this.buildAdditionalParams(teamId, gameId);

        return await this.request<any>(apiPath, additionalParams, league);
    }

    /**
     * Fetches live data.
     * @param params - Object containing optional date, league, teamId, and gameId parameters.
     * @returns The live data.
     */
    public async getLive({date = "now", league, teamId, gameId}: {
        date?: string,
        gameId?: string,
        league?: League,
        teamId?: string
    }): Promise<any> {
        const apiPath = this.buildApiPath("/live", date, league);
        const additionalParams = this.buildAdditionalParams(teamId, gameId);

        return this.request<any>(apiPath, additionalParams, league);
    }

    /**
     * Fetches team information.
     * @param params - Object containing optional league, teamId, and fromAssets parameters.
     * @returns The team information.
     * @refreshable
     */
    public async getTeamInfo({league, teamId}: {
        league: League,
        teamId?: string,
    }): Promise<LeagueTeamInfoMap[typeof league] | Array<LeagueTeamInfoMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/team-info", undefined, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<LeagueTeamInfoMap[typeof league] | Array<LeagueTeamInfoMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches team season statistics.
     * @param params - Object containing optional date, league, and teamId parameters.
     * @returns The team season statistics.
     * @refreshable
     */
    public async getTeamStats({date, league, teamId}: {
        date?: string,
        league: League,
        teamId?: string,
    }): Promise<LeagueTeamStatsMap[typeof league] | Array<LeagueTeamStatsMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/team-stats", date, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<LeagueTeamStatsMap[typeof league] | Array<LeagueTeamStatsMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches player information.
     * @param params - Object containing optional league, teamId, and fromAssets parameters.
     * @returns The player information.
     * @refreshable
     */
    public async getPlayerInfo({league, teamId}: {
        league: League,
        teamId?: string,
    }): Promise<LeaguePlayerInfoMap[typeof league] | Array<LeaguePlayerInfoMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/player-info", undefined, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<LeaguePlayerInfoMap[typeof league] | Array<LeaguePlayerInfoMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches player statistics.
     * @param params - Object containing optional date, league, teamId, and playerId parameters.
     * @returns The player statistics.
     * @refreshable
     */
    public async getPlayerStats({date, league, teamId, playerId}: {
        date?: string,
        league: League,
        playerId?: string,
        teamId?: string
    }): Promise<LeaguePlayerStatsMap[typeof league] | Array<LeaguePlayerStatsMap[typeof league]> | undefined> {
        const apiPath = this.buildApiPath("/player-stats", date, league);
        const additionalParams = this.buildAdditionalParams(teamId, undefined, playerId);

        return this.request<LeaguePlayerStatsMap[typeof league] | Array<LeaguePlayerStatsMap[typeof league]>>(apiPath, additionalParams, league);
    }

    /**
     * Fetches player injuries.
     * @param params - Object containing optional league and teamId parameters.
     * @returns The player injuries.
     */
    public async getPlayerInjuries({league, teamId}: {
        league: League,
        teamId?: string,
    }): Promise<any> {
        const apiPath = this.buildApiPath("/injuries", undefined, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<any>(apiPath, additionalParams, league);
    }

    /**
     * Fetches the team depth chart.
     * @param params - Object containing optional league and teamId parameters.
     * @returns The team depth chart.
     */
    public async getTeamDepthChart({league, teamId}: {
        league: League,
        teamId?: string,
    }): Promise<any> {
        const apiPath = this.buildApiPath("/depth-charts", undefined, league);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<any>(apiPath, additionalParams, league);
    }
}
