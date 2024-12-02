import { League } from "@sports-sdk/core";
import { MLBInjuriesResponse, MLBNewsResponse } from "./news/baseball.ts";
import {
  NCAAFInjuriesResponse,
  NCAAFNewsResponse,
  NFLInjuriesResponse,
  NFLNewsResponse,
} from "./news/football.ts";
import { EPLInjuriesResponse, EPLNewsResponse } from "./news/soccer.ts";
import { NBAInjuriesResponse, NBANewsResponse } from "./news/basketball.ts";
import { NHLInjuriesResponse, NHLNewsResponse } from "./news/hockey.ts";
import {
  MLBLineupsParameters,
  MLBLineupsResponse,
} from "./lineups/baseball.ts";
import {
  SoccerLineupsParameters,
  SoccerLineupsResponse,
} from "./lineups/soccer.ts";
import {
  NBALineupsParameters,
  NBALineupsResponse,
} from "./lineups/basketball.ts";
import {
  PlayersFreeAgentsTeams,
  PlayersPlayer,
  PlayersTeam,
  PlayersTeamDetailed,
} from "./players";

export type NewsResponse<T extends Omit<League, League.NCAAM>> =
  T extends League.MLB
    ? MLBNewsResponse
    : T extends League.NFL
      ? NFLNewsResponse
      : T extends League.NCAAF
        ? NCAAFNewsResponse
        : T extends League.EPL
          ? EPLNewsResponse
          : T extends League.NBA
            ? NBANewsResponse
            : T extends League.NHL
              ? NHLNewsResponse
              : never;

export type InjuriesResponse<T extends Omit<League, League.NCAAM>> =
  T extends League.MLB
    ? MLBInjuriesResponse
    : T extends League.NFL
      ? NFLInjuriesResponse
      : T extends League.NCAAF
        ? NCAAFInjuriesResponse
        : T extends League.EPL
          ? EPLInjuriesResponse
          : T extends League.NBA
            ? NBAInjuriesResponse
            : T extends League.NHL
              ? NHLInjuriesResponse
              : never;

export type LineupsParams<T extends Omit<League, League.NCAAM>> =
  T extends League.MLB
    ? MLBLineupsParameters
    : T extends League.EPL
      ? SoccerLineupsParameters
      : T extends League.NBA
        ? NBALineupsParameters
        : never;

export type LineupResponse<T extends Omit<League, League.NCAAM>> =
  T extends League.MLB
    ? MLBLineupsResponse
    : T extends League.EPL
      ? SoccerLineupsResponse
      : T extends League.NBA
        ? NBALineupsResponse
        : never;

export type PlayersResponse<T extends Omit<League, League.NCAAM>> =
  T extends League.NCAAF
    ? Array<PlayersPlayer>
    : T extends League.EPL
      ? PlayersFreeAgentsTeams<PlayersPlayer, PlayersTeam<PlayersPlayer>>
      : PlayersFreeAgentsTeams<
          PlayersPlayer,
          PlayersTeamDetailed<PlayersPlayer>
        >;
