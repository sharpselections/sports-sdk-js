import { SportsSdkClient } from "@sports-sdk/core";
import {
  GameOddsParameters,
  GameOddsResult,
  GamesParameters,
  Game,
  OddsSplitsParameters,
  RequestParams,
  RUWTResponse,
  SideOddsParameters,
  SideOddsResponse,
  PlayersParameters,
  Player,
  PlayerStatisticsParameters,
  PlayerStats,
  SportsResult,
  StandingsParameters,
  StandingsResult,
  TeamsParameters,
  Team,
  OddsSplitsResult,
  InjuriesParameters,
  PlayerInjury,
} from "./types.ts";
import { ZodObject } from "zod";
import axios from "axios";

export class RUWTClient extends SportsSdkClient {
  protected readonly apiKey: string;

  /**
   * Creates an Are You Watching This?! (RUWT) client.
   * @param siteId - Your unique RUWT site id. If not provided, it will look for `RUWT_SITE_ID` in the environment variables.
   * @param apiKey - The API token for authenticating API requests. If not provided, it will look for `RUWT_API_KEY` in the environment variables.
   * @throws Will throw an error if the API key is not provided or found in the environment variables.
   */
  constructor(siteId?: string, apiKey?: string) {
    const site = siteId || process.env.RUWT_SITE_ID;
    const token = apiKey || process.env.RUWT_API_KEY;

    if (!token) {
      throw new Error(
        "RUWT API key is required. Provide it as a parameter or set the environment variable RUWT_API_KEY."
      );
    }
    const endpoint = `https://${site ? `${site}.api.` : ""}areyouwatchingthis.com/api`;
    const session = axios.create({
      baseURL: endpoint,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: function (status) {
        // Client should accept and handle other status codes as they have meaning in the RUWT API
        return status < 500;
      },
    });
    super(endpoint, session);

    this.apiKey = token;
  }

  /**
   * Sends a GET request to the specified URL with the provided parameters.
   * @param apiPath - The path to append to the URL when sending the request.
   * @param additionalParams - Additional query parameters for the request.
   * @param parser - Optional ZodObject to parse the response data before returning it as T
   * @returns The response data from the API.
   */
  protected async request<T>({
    apiPath,
    additionalParams = {},
    parser,
  }: {
    additionalParams?: RequestParams;
    apiPath: string;
    parser?: ZodObject<any>;
  }): Promise<T> {
    const params = Object.entries(additionalParams).reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          // Handle array by appending each value with the same key
          value.forEach((val) => {
            acc.append(key, val);
          });
        } else {
          acc.append(key, value);
        }
        return acc;
      },
      new URLSearchParams({ apiKey: this.apiKey })
    );
    const response = await this.session.get(apiPath, { params });

    const result = parser?.parse(response.data) ?? response.data;
    return result as T;
  }

  public async getGames(
    parameters?: GamesParameters
  ): Promise<RUWTResponse<Game>> {
    const additionalParams: RequestParams = parameters
      ? {
          ...parameters,
          ...(parameters.dateRange && {
            startDate: parameters.dateRange[0],
            endDate: parameters.dateRange[1],
          }),
          ...(parameters.providerCoordinates && {
            providerLatitude: parameters.providerCoordinates[0],
            providerLongitude: parameters.providerCoordinates[1],
          }),
        }
      : {};

    return await this.request<RUWTResponse<Game>>({
      apiPath: "/games.json",
      additionalParams,
    });
  }

  public async getGameOdds(
    parameters?: GameOddsParameters
  ): Promise<RUWTResponse<GameOddsResult>> {
    return await this.request<RUWTResponse<GameOddsResult>>({
      apiPath: "/odds.json",
      additionalParams: parameters,
    });
  }

  public async getOddsSplits(
    parameters?: OddsSplitsParameters
  ): Promise<RUWTResponse<OddsSplitsResult>> {
    return await this.request<RUWTResponse<OddsSplitsResult>>({
      apiPath: "/odds-splits.json",
      additionalParams: parameters,
    });
  }

  public async getSideOdds(
    parameters?: SideOddsParameters
  ): Promise<SideOddsResponse> {
    return await this.request<SideOddsResponse>({
      apiPath: "/sideodds.json",
      additionalParams: parameters,
    });
  }

  public async getPlayers(
    parameters: PlayersParameters
  ): Promise<RUWTResponse<Player>> {
    return await this.request<RUWTResponse<Player>>({
      apiPath: "/players.json",
      additionalParams: parameters,
    });
  }

  public async getPlayerStatistics(
    parameters: PlayerStatisticsParameters
  ): Promise<RUWTResponse<PlayerStats>> {
    return await this.request<RUWTResponse<PlayerStats>>({
      apiPath: "/statistics.json",
      additionalParams: parameters,
    });
  }

  public async getSports(): Promise<RUWTResponse<SportsResult>> {
    return await this.request<RUWTResponse<SportsResult>>({
      apiPath: "/sports.json",
    });
  }

  public async getStandings(
    parameters: StandingsParameters
  ): Promise<RUWTResponse<StandingsResult>> {
    return await this.request<RUWTResponse<StandingsResult>>({
      apiPath: "/standings.json",
      additionalParams: parameters,
    });
  }

  public async getTeams(
    parameters: TeamsParameters
  ): Promise<RUWTResponse<Team>> {
    return await this.request<RUWTResponse<Team>>({
      apiPath: "/teams.json",
      additionalParams: parameters,
    });
  }

  public async getInjuries(
    parameters: InjuriesParameters
  ): Promise<RUWTResponse<PlayerInjury>> {
    return await this.request<RUWTResponse<PlayerInjury>>({
      apiPath: "/injuries.json",
      additionalParams: parameters,
    });
  }
}
