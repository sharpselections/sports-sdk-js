import {Sport} from "@sports-sdk/core";
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
    teams?: 8 | 10 | 12 | 14 | 16;
    budget?: number;
    format?: "std" | "ppr";
}

export interface FantasyLeadersParams {
    format?: "std" | "ppr" | "half";
    position?: "ALL" | "QB" | "RB" | "WR" | "TE" | "FLEX" | "K" | "IDP";
    week?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
}

export interface WeeklyProjectionsParams {
    week: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
}


export type DraftProjections<T extends Sport> =
    T extends Sport.NFL ? NFLDraftProjectionsResponse :
        T extends Sport.NBA ? NBADraftProjectionsResponse :
            T extends Sport.MLB ? MLBDraftProjectionsResponse :
                never;

export type DraftRankings<T extends Sport> =
    T extends Sport.NFL ? NFLDraftRankingsResponse :
        T extends Sport.NBA ? NBADraftRankingsResponse :
            T extends Sport.MLB ? MLBDraftRankingsResponse :
                never;

export type Schedule<T extends Sport> =
    T extends Sport.NFL ? NFLScheduleResponse :
        T extends Sport.NBA ? NBAScheduleResponse :
            T extends Sport.MLB ? MLBScheduleResponse :
                never;

export type Lineups<T extends Sport> =
    T extends Sport.NBA ? NBALineupsResponse :
        T extends Sport.MLB ? MLBLineupsResponse :
            never;

export type PlayerRater<T extends Sport> =
    T extends Sport.NBA ? NBAPlayerRaterResponse :
        T extends Sport.MLB ? MLBPlayerRaterResponse :
            never;

export type AuctionValues<T extends Sport> =
    T extends Sport.NFL ? NFLAuctionValuesResponse :
        T extends Sport.MLB ? MLBAuctionValuesResponse :
            never;

export type Weather<T extends Sport> =
    T extends Sport.NFL ? NFLWeatherResponse :
        T extends Sport.MLB ? MLBWeatherResponse :
            never;

export type Injuries<T extends Sport> =
    T extends Sport.NFL ? NFLInjuriesResponse :
        T extends Sport.NBA ? NBAInjuriesResponse :
            never;