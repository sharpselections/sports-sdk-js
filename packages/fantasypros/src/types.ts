import {Sport} from "@sports-sdk/core";

export type FantasyProsClientSports = Omit<Sport, Sport.EPL | Sport.NCAAF>;

/**
 * NFL specific types
 */

// NFL positions
export type FantasyProsNFLPosition =
    "QB"
    | "RB"
    | "WR"
    | "TE"
    | "K"
    | "OP"
    | "FLX"
    | "DST"
    | "IDP"
    | "DL"
    | "LB"
    | "DB"
    | "TK"
    | "TQB"
    | "TRB"
    | "TWR"
    | "TTE"
    | "TOL"
    | "HC"
    | "P";

// NFL rankings types
export type FantasyProsNFLRankingsType =
// Rest of Season
    "ROS"
    // Dynasty
    | "DK"
    // Waiver wire
    | "WW"
    // Average Draft Position
    | "ADP"
    | "weekly"
    | "draft";

// NFL scoring types
export type FantasyProsNFLScoringType = "STD" | "PPR" | "HALF";

/**
 * NBA specific types
 */

// NBA positions
export type FantasyProsNBAPosition = "ALL" | "PG" | "SG" | "SF" | "PF" | "G" | "F" | "C" | "SGF" | "PFC";

// NBA rankings types
export type FantasyProsNBARankingsType =
// Rest of Season
    "ROS"
    // Dynasty
    | "DK"
    // Average Draft Position
    | "ADP"
    | "draft";

// NBA scoring types
export type FantasyProsNBAScoringType = "ROTO" | "YAHOO" | "ESPN" | "CBS";

/**
 * MLB specific types
 */

// MLB positions
export type FantasyProsMLBPosition =
    "ALL"
    | "H"
    | "P"
    | "1B"
    | "2B"
    | "3B"
    | "SS"
    | "C"
    | "OF"
    | "SP"
    | "RP"
    | "DH"
    | "LF"
    | "CF"
    | "RF";

// MLB rankings types
export type FantasyProsMLBRankingsType =
// Rest of Season
    "ROS"
    // Dynasty
    | "DK"
    // Average Draft Position
    | "ADP"
    // Prospects TODO
    | "prospect"
    | "draft";

/**
 * NHL specific types
 */

// NHL positions
export type FantasyProsNHLPosition = "ALL" | "C" | "LW" | "RW" | "D" | "G";

// NHL rankings types
export type FantasyProsNHLRankingsType =
// Rest of Season
    "ROS"
    // Average Draft Position
    | "ADP"
    | "draft";

// NHL scoring types
export type FantasyProsNHLScoringType = "ROTO" | "YAHOO" | "ESPN";

/**
 * Generic/dynamically typed types
 */

// Position
export type FantasyProsPosition<T extends FantasyProsClientSports> =
    T extends Sport.NFL ? FantasyProsNFLPosition :
        T extends Sport.NBA ? FantasyProsNBAPosition :
            T extends Sport.MLB ? FantasyProsMLBPosition :
                T extends Sport.NHL ? FantasyProsNHLPosition :
                    never;

export type FantasyProsRankingsType<T extends FantasyProsClientSports> =
    T extends Sport.NFL ? FantasyProsNFLRankingsType :
        T extends Sport.NBA ? FantasyProsNBARankingsType :
            T extends Sport.MLB ? FantasyProsMLBRankingsType :
                T extends Sport.NHL ? FantasyProsNHLRankingsType :
                    never;

export type FantasyProsScoringType<T extends Omit<FantasyProsClientSports, Sport.MLB>> =
    T extends Sport.NFL ? FantasyProsNFLScoringType :
        T extends Sport.NBA ? FantasyProsNBAScoringType :
            T extends Sport.NHL ? FantasyProsNHLScoringType :
                never;

export type GetRankingsParameters<T extends FantasyProsClientSports> =
    T extends Sport.NFL | Sport.NBA | Sport.NHL ? RankingsWithScoringProps<T> :
        T extends Sport.MLB ? RankingsProps<T> :
            never;


export interface RankingsProps<T extends FantasyProsClientSports> {
    /**
     * The positions to return the rankings for. If omitted, all will be searched.
     */
    position?: FantasyProsPosition<T>;
    /**
     * The rankings type such as Rest of Season (ROS)" | " Dynasty (DK)" | " etc. Omit to get preseason/weekly rankings
     */
    rankingsType?: FantasyProsRankingsType<T>;
    /**
     * The fantasy season to get rankings for
     */
    season: number;
    /**
     * Whether to include the expert's information.
     * @FTD - Show expert information like name and twitter handle.
     */
    showExperts?: boolean;
    /**
     * Specific experts to get rankings from via the expert's id
     */
    specificExperts?: Array<string>;
    /**
     * The week to get the rankings for
     */
    week?: number;
}

export interface RankingsWithScoringProps<T extends Omit<FantasyProsClientSports, Sport.MLB>> extends RankingsProps<T> {
    /**
     * Leagues scoring type
     */
    scoring?: FantasyProsScoringType<T>;
}

export interface RankingsResponse {
  count: number,
  expert_image_url?: {
    [key: string]: string;
  },
  expert_names?: {
    [key: string]: string;
  },
  expert_pub?: {
    [key: string]: string;
  },
  expert_twitter?: {
    [key: string]: string;
  },
  filters: string,
  last_updated: string,
  last_updated_ts: number,
  players: Array<RankingsPlayer>,
  position_id: string,
  ranking_type_name: string,
  scoring: string,
  sport: string,
  total_experts: number,
  type: string,
  week: string,
  year: string
}

export interface RankingsPlayer {
    cbs_player_id: string,
    experts?: {
      [key: string]: string
    },
    player_bye_week?: string,
    player_ecr_delta?: number,
    player_eligibility: string,
    player_filename: string,
    player_id: number,
    player_image_url: string,
    player_name: string,
    player_owned_avg: number,
    player_owned_espn: number,
    player_owned_yahoo: number,
    player_page_url: string,
    player_position_id: string,
    player_positions: string,
    player_short_name: string,
    player_square_image_url: string,
    player_team_id: string,
    player_yahoo_id: string,
    player_yahoo_positions?: string,
    pos_rank: string,
    rank_ave: string,
    rank_ecr: number,
    rank_max: string,
    rank_min: string
    rank_points: number,
    rank_std: string,
    sportsdata_id?: string,
    tier: number
}


