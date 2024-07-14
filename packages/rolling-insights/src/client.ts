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
	readonly cachePath?: string;

	/**
	 * Creates a  Rolling Insights client.
	 * @param rscToken - The RSC token for authenticating API requests. If not provided, it will look for `DATA_FEEDS_RSC_TOKEN` in the environment variables.
	 * @param cachePath - The path to check for method responses before hitting the endpoint. Outside of the live endpoint, a lot of the contents will not change frequently. With this in mind, functionality to support a "cache" directory is provided. ex: ../../assets/data-feeds
	 * @throws Will throw an error if the RSC token is not provided or found in the environment variables.
	 */
	constructor(rscToken?: string, cachePath?: string) {
		super("http://rest.datafeeds.rolling-insights.com/api/v1");
		this.cachePath = cachePath;
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
		const params = { RSC_token: this.rscToken, ...additionalParams };
		const response = await this.session.get(`${url}?${Date.now()}`, { params });

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
	 * Fetches cached data if available, otherwise makes an API request.
	 * @param apiPath - The API path.
	 * @param additionalParams - Additional query parameters for the request.
	 * @param method - The method name to check if cached.
	 * @param fresh - Whether to bypass the cache and fetch fresh data.
	 * @param sport - Sport to return.
	 * @returns The data from cache or API.
	 * @throws Will throw an error if both team_id and player_id are provided.
	 */
	private async getCachedDataOrFetch<T>({ apiPath, additionalParams, method, fresh, sport }: {
		apiPath: string,
		additionalParams: AdditionalParams,
		method: string,
		fresh: boolean,
		sport: Sport,
	}): Promise<T | undefined> {
		const { team_id, player_id } = additionalParams;

		// Handle cases where both team_id and player_id are provided
		if (team_id && player_id) {
			throw new Error("Both team_id and player_id cannot be provided simultaneously.");
		}

		// Handle caching logic
		if (!fresh && this.cachePath) {
			try {
				const data = (await import(`${this.cachePath}/${method}/${sport}.ts`)).default;
				if (team_id) {
					return data[team_id];
				}
				if (player_id) {
					return data[player_id];
				}
				return data;
			} catch (error) {
				console.warn(`Failed to load from cache: ${(error as Error).message}. Fetching from API...`);
			}
		}

		// Fall back to API request
		return this.request<T>(apiPath, additionalParams, sport);
	}

	/**
	 * Fetches the season schedule data.
	 * @param params - Object containing optional date, sport, and teamId parameters.
	 * @returns The season schedule data.
	 */
	public async getSeasonSchedule({ date, sport, teamId }: {
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
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The weekly schedule data.
	 * @refreshable
	 */
	public async getWeeklySchedule({ date = "now", sport, teamId, fresh = false }: {
		date?: string,
		sport: Sport,
		teamId?: string,
		fresh?: boolean
	}): Promise<Array<SportScheduleMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/schedule-week", date, sport);
		const additionalParams = this.buildAdditionalParams(teamId);

		return this.getCachedDataOrFetch<Array<SportScheduleMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getWeeklySchedule",
		});
	}

	/**
	 * Fetches the daily schedule data.
	 * @param params - Object containing optional date, sport, teamId, and gameId parameters.
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The daily schedule data.
	 * @refreshable
	 */
	public async getDailySchedule({ date = "now", sport, teamId, gameId, fresh = false }: {
		date?: string,
		sport: Sport,
		teamId?: string,
		gameId?: string,
		fresh?: boolean
	}): Promise<Array<SportScheduleMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/schedule", date, sport);
		const additionalParams = this.buildAdditionalParams(teamId, gameId);

		return this.getCachedDataOrFetch<Array<SportScheduleMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getDailySchedule",
		});
	}

	/**
	 * Fetches live data.
	 * @param params - Object containing optional date, sport, teamId, and gameId parameters.
	 * @returns The live data.
	 */
	public async getLive({ date = "now", sport, teamId, gameId }: {
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
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The team information.
	 * @refreshable
	 */
	public async getTeamInfo({ sport, teamId, fresh = false }: {
		sport: Sport,
		teamId?: string,
		fresh?: boolean
	}): Promise<SportTeamInfoMap[typeof sport] | Array<SportTeamInfoMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/team-info", undefined, sport);
		const additionalParams = this.buildAdditionalParams(teamId);

		return this.getCachedDataOrFetch<SportTeamInfoMap[typeof sport] | Array<SportTeamInfoMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getTeamInfo",
		});
	}

	/**
	 * Fetches team season statistics.
	 * @param params - Object containing optional date, sport, and teamId parameters.
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The team season statistics.
	 * @refreshable
	 */
	public async getTeamStats({ date, sport, teamId, fresh = false }: {
		date?: string,
		sport: Sport,
		teamId?: string,
		fresh?: boolean
	}): Promise<SportTeamStatsMap[typeof sport] | Array<SportTeamStatsMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/team-stats", date, sport);
		const additionalParams = this.buildAdditionalParams(teamId);

		return this.getCachedDataOrFetch<SportTeamStatsMap[typeof sport] | Array<SportTeamStatsMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getTeamStats",
		});
	}

	/**
	 * Fetches player information.
	 * @param params - Object containing optional sport, teamId, and fromAssets parameters.
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The player information.
	 * @refreshable
	 */
	public async getPlayerInfo({ sport, teamId, fresh = false }: {
		sport: Sport,
		teamId?: string,
		fresh?: boolean
	}): Promise<SportPlayerInfoMap[typeof sport] | Array<SportPlayerInfoMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/player-info", undefined, sport);
		const additionalParams = this.buildAdditionalParams(teamId);

		return this.getCachedDataOrFetch<SportPlayerInfoMap[typeof sport] | Array<SportPlayerInfoMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getPlayerInfo",
		});
	}

	/**
	 * Fetches player statistics.
	 * @param params - Object containing optional date, sport, teamId, and playerId parameters.
	 * @param fresh - If true, bypass the cache and fetch fresh data.
	 * @returns The player statistics.
	 * @refreshable
	 */
	public async getPlayerStats({ date, sport, teamId, playerId, fresh = false }: {
		date?: string,
		sport: Sport,
		teamId?: string,
		playerId?: string,
		fresh?: boolean
	}): Promise<SportPlayerStatsMap[typeof sport] | Array<SportPlayerStatsMap[typeof sport]> | undefined> {
		const apiPath = this.buildApiPath("/player-stats", date, sport);
		const additionalParams = this.buildAdditionalParams(teamId, undefined, playerId);

		return this.getCachedDataOrFetch<SportPlayerStatsMap[typeof sport] | Array<SportPlayerStatsMap[typeof sport]>>({
			apiPath,
			additionalParams,
			sport,
			fresh,
			method: "getPlayerStats",
		});
	}

	/**
	 * Fetches player injuries.
	 * @param params - Object containing optional sport and teamId parameters.
	 * @returns The player injuries.
	 */
	public async getPlayerInjuries({ sport, teamId }: {
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
	public async getTeamDepthChart({ sport, teamId }: {
		sport: Sport,
		teamId?: string,
	}): Promise<any> {
		const apiPath = this.buildApiPath("/depth-charts", undefined, sport);
		const additionalParams = this.buildAdditionalParams(teamId);

		return this.request<any>(apiPath, additionalParams, sport);
	}
}
