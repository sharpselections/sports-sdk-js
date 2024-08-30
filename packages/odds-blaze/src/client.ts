import {RequestParams, League} from "@sports-sdk/core";
import {
    BetSettlementProps, BetSettlementResponse,
    MarketsProps,
    MarketsResponse,
    OddsBlazeSubDomains,
    OddsProps,
    OddsResponse,
    PlayersProps, PlayersResponse,
    SameGameParlayProps, SameGameParlayResponse,
    SportsbooksResponse,
    TeamsProps,
    TeamsResponse,
} from "./types.ts";
import axios, {AxiosInstance} from "axios";
import {OddsBlazeLeague} from "./enums.ts";

/**
 * OddsBlaze has multiple subdomains that is uses (data, api, sgp), so it is easier to not extend from the base client
 */

export class OddsBlazeClient {
    protected readonly apiKey: string;
    private readonly axiosInstances: { [K in OddsBlazeSubDomains]: AxiosInstance };

    /**
     * Create an OddsBlaze API client
     * @param apiKey - The API key for authenticating API requests. If not provided, it will look for `ODDS_BLAZE_KEY` in the environment variables.
     * @param apiVersion - The version of the OddsBlaze API endpoint to use
     * @throws Will throw an error if the API key is not provided or found in the environment variables.
     */
    constructor(apiKey?: string, private readonly apiVersion = "v1") {
        const key = apiKey || process.env.ODDS_BLAZE_KEY;
        if (!key) {
            throw new Error("OddsBlaze API key is required. Provide it as a parameter or set the environment variable ODDS_BLAZE_KEY.");
        }
        this.apiKey = key;
        this.axiosInstances = {
            "api": this.getAxiosInstance("api"),
            "data": this.getAxiosInstance("data"),
            "sgp": this.getAxiosInstance("sgp")
        };
    }

    private getAxiosInstance(subDomain: OddsBlazeSubDomains): AxiosInstance {
        return axios.create({
            baseURL: `https://${subDomain}.oddsblaze.com/${this.apiVersion}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    public static coreLeagueToOddsBlazeLeague(league: League): OddsBlazeLeague {
        switch (league) {
            case League.NFL:
                return OddsBlazeLeague.NFL;
            case League.EPL:
                return OddsBlazeLeague.EPL;
            case League.MLB:
                return OddsBlazeLeague.MLB;
            case League.NCAAF:
                return OddsBlazeLeague.NCAAF;
            default:
                throw new Error("OddsBlaze does not support this league yet");
        }
    }

    /**
     * Sends a GET request to the specified URL path.
     * @param subDomain - The OddsBlaze subdomain to call
     * @param path - The path to append to base URL to send the request to.
     * @param body - The body to send with the post request
     * @param method - The HTTP method to use
     * @param additionalParams - Additional query parameters for the request.
     * @returns The response data from the API
     * @throws Will throw an error if the request fails.
     */
    private async request<T>({subDomain, path, body = {}, method = "get", additionalParams = {}}: {
        additionalParams?: RequestParams,
        body?: Record<string, any>,
        method?: "get" | "post";
        path: string,
        subDomain: OddsBlazeSubDomains,
    }): Promise<T> {
        additionalParams = {"key": this.apiKey, ...additionalParams};
        const params = Object.entries(additionalParams).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
                // Handle array by joining each value with the same key via a comma
                acc.append(key, value.join(","))
            } else {
                acc.append(key, value);
            }
            return acc;
        }, new URLSearchParams());
        const response = await this.axiosInstances[subDomain][method](path, {
            params,
            data: body
        });

        if (response.status === 200) {
            return response.data as T;
        }
        throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
    }

    public async getOdds(props: OddsProps) {
        const {league, sportsbook} = props;
        return await this.request<OddsResponse>({
            subDomain: "data",
            path: `/odds/${sportsbook}_${league}.json`,
        })
    }

    public async settleBets(props: BetSettlementProps) {
        return this.request<BetSettlementResponse>({
            subDomain: "api",
            method: "post",
            path: "/grader",
            body: {
                odds: props.gradeIds.map((gradeId) => ({"grade": gradeId}))
            },
        })
    }

    public async priceSameGameParlay(props: SameGameParlayProps) {
        const {sgpIds, ...additionalParams} = props;
        return this.request<SameGameParlayResponse>({
            subDomain: "sgp",
            method: "post",
            path: "/",
            body: {
                odds: sgpIds.map((sgp) => ({"sgp": sgp}))
            },
            additionalParams,
        })
    }

    public async getSportsbooks() {
        return await this.request<SportsbooksResponse>({
            path: `/sportsbooks.json`,
            subDomain: "data",
        })
    }

    public async getMarkets(props: MarketsProps) {
        return await this.request<MarketsResponse>({
            path: `/markets/${props.league}.json`,
            subDomain: "data",
        })
    }

    public async getTeams(props: TeamsProps) {
        return await this.request<TeamsResponse>({
            subDomain: "api",
            path: "/teams",
            additionalParams: props,
        })
    }

    public async getPlayers(props: PlayersProps) {
        return await this.request<PlayersResponse>({
            subDomain: "api",
            path: "/players",
            additionalParams: props,
        })
    }
}