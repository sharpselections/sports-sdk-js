import {League} from "@sports-sdk/core";
import {
    NFLAuctionValuesResponse,
    NFLDraftProjectionsResponse,
    NFLDraftRankingsResponse, NFLInjuriesResponse,
    NFLScheduleResponse, NFLWeatherResponse
} from "./responses/nfl.ts";
import {
    NBADraftProjectionsResponse,
    NBADraftRankingsResponse, NBAInjuriesResponse,
    NBALineupsResponse, NBAPlayerRaterResponse,
    NBAScheduleResponse
} from "./responses/nba.ts";
import {
    MLBAuctionValuesResponse,
    MLBDraftProjectionsResponse,
    MLBDraftRankingsResponse,
    MLBLineupsResponse, MLBPlayerRaterResponse,
    MLBScheduleResponse, MLBWeatherResponse
} from "./responses/mlb.ts";

export interface RequestParams {
    [key: string]: any;
}

export interface DraftRankingsParams {
    format?: "std" | "ppr" | "half" | "superflex";
}

export interface PlayersParams {
    include_inactive?: 1;
}

export interface LineupsParams {
    date?: string; // YYYY-MM-DD format
}

export interface AuctionValuesParams {
    budget?: number;
    format?: "std" | "ppr";
    teams?: 8 | 10 | 12 | 14 | 16;
}

export interface FantasyLeadersParams {
    format?: "std" | "ppr" | "half";
    position?: "ALL" | "QB" | "RB" | "WR" | "TE" | "FLEX" | "K" | "IDP";
    week?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
}

export interface WeeklyProjectionsParams {
    week: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
}


export type DraftProjections<T extends League> =
    T extends League.NFL ? NFLDraftProjectionsResponse :
        T extends League.NBA ? NBADraftProjectionsResponse :
            T extends League.MLB ? MLBDraftProjectionsResponse :
                never;

export type DraftRankings<T extends League> =
    T extends League.NFL ? NFLDraftRankingsResponse :
        T extends League.NBA ? NBADraftRankingsResponse :
            T extends League.MLB ? MLBDraftRankingsResponse :
                never;

export type Schedule<T extends League> =
    T extends League.NFL ? NFLScheduleResponse :
        T extends League.NBA ? NBAScheduleResponse :
            T extends League.MLB ? MLBScheduleResponse :
                never;

export type Lineups<T extends League> =
    T extends League.NBA ? NBALineupsResponse :
        T extends League.MLB ? MLBLineupsResponse :
            never;

export type PlayerRater<T extends League> =
    T extends League.NBA ? NBAPlayerRaterResponse :
        T extends League.MLB ? MLBPlayerRaterResponse :
            never;

export type AuctionValues<T extends League> =
    T extends League.NFL ? NFLAuctionValuesResponse :
        T extends League.MLB ? MLBAuctionValuesResponse :
            never;

export type Weather<T extends League> =
    T extends League.NFL ? NFLWeatherResponse :
        T extends League.MLB ? MLBWeatherResponse :
            never;

export type Injuries<T extends League> =
    T extends League.NFL ? NFLInjuriesResponse :
        T extends League.NBA ? NBAInjuriesResponse :
            never;