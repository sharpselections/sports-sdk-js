import { League, SportsSdkClient } from "@sports-sdk/core";
import {
  InjuriesResponse,
  LineupResponse,
  LineupsParams,
  NewsResponse,
  PlayersResponse,
} from "./types.ts";
import { NewsParameters } from "./news/common.ts";

type RequestParams = {
  [key: string]: any;
};

export class RotowireClient<
  S extends
    | League.NBA
    | League.MLB
    | League.EPL
    | League.NCAAF
    | League.NFL
    | League.NHL,
> extends SportsSdkClient {
  protected readonly apiToken: string;
  static readonly leagueMappings: Record<
    | League.NBA
    | League.MLB
    | League.EPL
    | League.NCAAF
    | League.NFL
    | League.NHL,
    string
  > = {
    [League.EPL]: "/Soccer/EPL",
    [League.MLB]: "/Baseball/MLB",
    [League.NBA]: "/Basketball/NBA",
    [League.NCAAF]: "/Football/CFB",
    [League.NFL]: "/Football/NFL",
    [League.NHL]: "/Hockey/NHL",
  };

  /**
   * Creates a Rotowire client.
   * @param league - The league to get data from
   * @param apiToken - The API token for authenticating API requests. If not provided, it will look for `ROTOWIRE_TOKEN` in the environment variables.
   * @throws Will throw an error if the API token is not provided or found in the environment variables.
   */
  constructor(
    protected readonly league: S,
    apiToken?: string
  ) {
    super(`https://api.rotowire.com${RotowireClient.leagueMappings[league]}`);
    const token = apiToken || process.env.ROTOWIRE_TOKEN;

    if (!token) {
      throw new Error(
        "Rotowire API token is required. Provide it as a parameter or set the environment variable ROTOWIRE_TOKEN."
      );
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
  protected async request<T>({
    apiPath,
    additionalParams = {},
  }: {
    additionalParams?: RequestParams;
    apiPath: string;
  }): Promise<T> {
    const params = { key: this.apiToken, format: "json", ...additionalParams };
    const response = await this.session.get(apiPath, { params });

    if (response.status !== 200) {
      throw new Error(
        `Failed to get a valid response: status code ${response.status}, response body ${response.data}`
      );
    }
    return response.data as T;
  }

  /**
   * Retrieves players for the selected league. The typing of the response is intentionally sparse as this endpoint is primarily useful for retrieving RW player ids.
   * @supports ALL
   */
  public async getPlayers<T extends PlayersResponse<S> = PlayersResponse<S>>(
    letter?: string
  ): Promise<T> {
    return this.request<T>({
      apiPath: "/Players.php",
      additionalParams: letter
        ? {
            letter: letter,
          }
        : undefined,
    });
  }

  /**
   * Retrieves news for the selected league.
   * @supports ALL
   */
  public async getNews<T extends NewsResponse<S> = NewsResponse<S>>(
    params?: NewsParameters
  ): Promise<T> {
    return this.request<T>({
      apiPath: "/News.php",
      additionalParams: params,
    });
  }

  /**
   * Retrieves injuries for the selected league.
   * @supports ALL
   */
  public async getInjuries<
    T extends InjuriesResponse<S> = InjuriesResponse<S>,
  >(): Promise<T> {
    return this.request<T>({
      apiPath: "/Injuries.php",
    });
  }

  /**
   * Retrieves lineups for the selected league.
   * @supports NBA, MLB, EPL
   */
  public async getLineups<T extends LineupResponse<S> = LineupResponse<S>>(
    params?: LineupsParams<S>
  ): Promise<T> {
    if (
      !(
        this.league === League.NBA ||
        this.league === League.MLB ||
        this.league === League.EPL
      )
    ) {
      throw new Error("Only NBA, MLB, & EPL are supported!");
    }
    return this.request<T>({
      apiPath: `/${this.league === League.MLB ? "Expected" : ""}Lineups.php`,
      additionalParams: params,
    });
  }
}
