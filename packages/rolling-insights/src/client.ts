import {Sport, SportsSdkClient} from "@sports-sdk/core";
import {
    SportPlayerInfoMap,
    SportPlayerStatsMap,
    SportScheduleMap,
    SportTeamInfoMap,
    SportTeamStatsMap,
} from "./types";

/**
 * Type for additional parameters used in API requests.
 */
type AdditionalParams = {
    team_id?: string;
    game_id?: string;
    player_id?: string;
    [key: string]: any;
};

export class RollingInsightsClient extends SportsSdkClient {
    protected readonly rscToken: string;

    /**
     * Creates a  Rolling Insights client.
     * @param rscToken - The RSC token for authenticating API requests. If not provided, it will look for `DATA_FEEDS_RSC_TOKEN` in the environment variables.
     * @throws Will throw an error if the RSC token is not provided or found in the environment variables.
     */
    constructor(rscToken?: string) {
        super("http://rest.datafeeds.rolling-insights.com/api/v1");
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
     * @param sport - The sport to extract from the response.
     * @returns The response data from the API or undefined if the API returns 304
     * @throws Will throw an error if the request fails.
     */
    private async request<T>(url: string, additionalParams: AdditionalParams = {}, sport: Sport): Promise<T | undefined> {
        const {team_id, player_id} = additionalParams;

        // Handle cases where both team_id and player_id are provided
        if (team_id && player_id) {
            throw new Error("Both team_id and player_id cannot be provided simultaneously.");
        }

        const params = {RSC_token: this.rscToken, ...additionalParams};
        const response = await this.session.get(`${url}?${Date.now()}`, {params});

        if (response.status === 200) {
            return response.data.data[sport] as T;
        }
        if (response.status === 304) {
            return undefined;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }

    /**
     * Builds the API path with optional date and sports parameters.
     * @param basePath - The base path of the API endpoint.
     * @param date - Optional date parameter.
     * @param sports - Optional array of sports or a single sport.
     * @returns The constructed API path.
     */
    private buildApiPath(basePath: string, date?: string, sports?: Sport[] | Sport): string {
        let apiPath = basePath;
        if (date) apiPath += `/${date}`;
        if (sports) {
            if (Array.isArray(sports)) {
                apiPath += `/${sports.join("-")}`;
            } else {
                apiPath += `/${sports}`;
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
     * @param params - Object containing optional date, sport, and teamId parameters.
     * @returns The season schedule data.
     */
    public async getSeasonSchedule({date, sport, teamId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
    }): Promise<Array<SportScheduleMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/schedule-season", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return await this.request<Array<SportScheduleMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches the weekly schedule data.
     * @param params - Object containing optional date, sport, and teamId parameters.
     * @returns The weekly schedule data.
     * @refreshable
     */
    public async getWeeklySchedule({date = "now", sport, teamId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
    }): Promise<Array<SportScheduleMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/schedule-week", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return await this.request<Array<SportScheduleMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches the daily schedule data.
     * @param params - Object containing optional date, sport, teamId, and gameId parameters.
     * @returns The daily schedule data.
     * @refreshable
     */
    public async getDailySchedule({date = "now", sport, teamId, gameId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
        gameId?: string,
    }): Promise<Array<SportScheduleMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/schedule", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId, gameId);

        return await this.request<Array<SportScheduleMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches live data.
     * @param params - Object containing optional date, sport, teamId, and gameId parameters.
     * @returns The live data.
     */
    public async getLive({date = "now", sport, teamId, gameId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
        gameId?: string
    }): Promise<any> {
        const apiPath = this.buildApiPath("/live", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId, gameId);

        return this.request<any>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches team information.
     * @param params - Object containing optional sport, teamId, and fromAssets parameters.
     * @returns The team information.
     * @refreshable
     */
    public async getTeamInfo({sport, teamId}: {
        sport: Sport,
        teamId?: string,
    }): Promise<SportTeamInfoMap[typeof sport] | Array<SportTeamInfoMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/team-info", undefined, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<SportTeamInfoMap[typeof sport] | Array<SportTeamInfoMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches team season statistics.
     * @param params - Object containing optional date, sport, and teamId parameters.
     * @returns The team season statistics.
     * @refreshable
     */
    public async getTeamStats({date, sport, teamId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
    }): Promise<SportTeamStatsMap[typeof sport] | Array<SportTeamStatsMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/team-stats", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<SportTeamStatsMap[typeof sport] | Array<SportTeamStatsMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches player information.
     * @param params - Object containing optional sport, teamId, and fromAssets parameters.
     * @returns The player information.
     * @refreshable
     */
    public async getPlayerInfo({sport, teamId}: {
        sport: Sport,
        teamId?: string,
    }): Promise<SportPlayerInfoMap[typeof sport] | Array<SportPlayerInfoMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/player-info", undefined, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<SportPlayerInfoMap[typeof sport] | Array<SportPlayerInfoMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches player statistics.
     * @param params - Object containing optional date, sport, teamId, and playerId parameters.
     * @returns The player statistics.
     * @refreshable
     */
    public async getPlayerStats({date, sport, teamId, playerId}: {
        date?: string,
        sport: Sport,
        teamId?: string,
        playerId?: string,
    }): Promise<SportPlayerStatsMap[typeof sport] | Array<SportPlayerStatsMap[typeof sport]> | undefined> {
        const apiPath = this.buildApiPath("/player-stats", date, sport);
        const additionalParams = this.buildAdditionalParams(teamId, undefined, playerId);

        return this.request<SportPlayerStatsMap[typeof sport] | Array<SportPlayerStatsMap[typeof sport]>>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches player injuries.
     * @param params - Object containing optional sport and teamId parameters.
     * @returns The player injuries.
     */
    public async getPlayerInjuries({sport, teamId}: {
        sport: Sport,
        teamId?: string,
    }): Promise<any> {
        const apiPath = this.buildApiPath("/injuries", undefined, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<any>(apiPath, additionalParams, sport);
    }

    /**
     * Fetches the team depth chart.
     * @param params - Object containing optional sport and teamId parameters.
     * @returns The team depth chart.
     */
    public async getTeamDepthChart({sport, teamId}: {
        sport: Sport,
        teamId?: string,
    }): Promise<any> {
        const apiPath = this.buildApiPath("/depth-charts", undefined, sport);
        const additionalParams = this.buildAdditionalParams(teamId);

        return this.request<any>(apiPath, additionalParams, sport);
    }
}
