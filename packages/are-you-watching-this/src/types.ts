import { RUWTLeagueCode, RUWTOddsProvider, RUWTSport } from "./enums.ts";

export interface RequestParams {
  [key: string]: any;
}

export interface ResponseMetaData {
  code: number;
  count: number;
  description: string;
}

export interface RUWTResponse<T> {
  meta: ResponseMetaData;
  results?: Array<T>;
}

export interface GamesParameters {
  // Used as a pair in milliseconds since epoch format; i.e. 1325005200000
  dateRange?: [number, number];
  // When used with providerID or providerCoordinates; this parameter will automatically set the start date to be now and the end date to be 14 days in advance; the maximum number of days of airings
  full?: boolean;
  // The ID of a game
  gameID?: number;
  // If enabled on your account; game-specific projections for individual players will be included
  includePlayerProjections?: boolean;
  // If providerCoordinates is specified; an affiliation like 'CBS' or 'NBC' can be used to filter stations
  providerAffiliation?: string;
  // Coordinates for nearby over-the-air stations [latitude; longitude]
  providerCoordinates?: [number, number];
  // The ID of a cable or satellite provider
  providerID?: string;
  // The abbreviation for the sports; such as mlb; nfl; or ncaab.
  sports?: Array<RUWTSport>;
  // The ID of a team
  teamID?: number;
}

export interface Game {
  assets?: Array<GameAsset>;
  attributes: Array<GameAttribute>;
  competition?: string;
  date: number;
  gameID: number;
  headline?: string;
  highPoints: number;
  insights?: Array<string>;
  label?: string;
  leagueCode: RUWTLeagueCode;
  location?: string;
  points: number;
  pointsLevel: string;
  programIDs?: Array<string>;
  rationale?: string;
  rotationNumber1?: number;
  rotationNumber2?: number;
  round?: string;
  seasonSection?: string;
  sport: RUWTSport;
  statistics?: {
    team1?: RUWTStatistics<Array<GamePlayerStatistic>>;
    team2?: RUWTStatistics<Array<GamePlayerStatistic>>;
  };
  team1City?: string;
  team1Color?: string;
  team1ID?: number;
  team1Initials?: string;
  team1Name?: string;
  team1Nickname?: string;
  team1Score?: number;
  team2City?: string;
  team2Color?: string;
  team2ID?: number;
  team2Initials?: string;
  team2Name?: string;
  team2Nickname?: string;
  team2Score?: number;
  time?: number;
  timeLeft?: string;
}

export interface GameAsset {
  assetID: number;
  date: number;
  description?: string;
  duration?: number;
  gameID: number;
  pointsLevel: string;
  source: string;
  sport: RUWTSport;
  tags?: Array<string>;
  title: string;
  type: string;
  url: string;
}

export interface GameAttribute {
  data: Array<any>;
  format: string;
  name: string;
}

export interface GamePlayerStatistic {
  firstName: string;
  lastName: string;
  playerID: number;
  position: string;
  value: number;
}

export interface GameOddsParameters {
  // The ID of a game
  gameID?: number;
  // Whether you want the historical odds; requires gameID to be provided
  history?: boolean;
  // The odds provider
  provider?: RUWTOddsProvider;
  // Free-text query like 'yankees' or 'nhl/rangers'.
  q?: string;
  // The abbreviation for the sport; such as mlb; nfl; or ncaab.
  sport?: RUWTSport;
  // The ID of a team
  teamID?: number;
}

export interface GameOddsResult extends Game {
  odds: Array<GameOdds>;
}

export interface GameOdds {
  date: number;
  moneyLine1?: number;
  moneyLine2?: number;
  moneyLineTie?: number;
  overUnder?: number;
  overUnderLineOver?: number;
  overUnderLineUnder?: number;
  provider: RUWTOddsProvider;
  spread?: number;
  spreadLine1?: number;
  spreadLine2?: number;
  url?: string;
}

export interface OddsSplitsParameters {
  // The ID of a game
  gameID?: number;
  leagueCode?: RUWTLeagueCode;
  // The abbreviation for the sport; such as mlb; nfl; or ncaab.
  sport?: RUWTSport;
  // The ID of a team
  teamID?: number;
}

export interface OddsSplitsResult extends Game {
  splits: Array<OddsSplits>;
}

/**
 * Handle = Money wagered
 */
export interface OddsSplits {
  moneyLine1BetPercentage: number;
  moneyLine1HandlePercentage: number;
  moneyLine2BetPercentage: number;
  moneyLine2HandlePercentage: number;
  overUnderLineOverBetPercentage: number;
  overUnderLineOverHandlePercentage: number;
  overUnderLineUnderBetPercentage: number;
  overUnderLineUnderHandlePercentage: number;
  spreadLine1BetPercentage: number;
  spreadLine1HandlePercentage: number;
  spreadLine2BetPercentage: number;
  spreadLine2HandlePercentage: number;
}

export interface SideOddsParameters {
  // The ID of a game
  gameID?: number;
  leagueCode?: RUWTLeagueCode;
  playerID?: number;
  // Free-text query like 'yankees' or 'nhl/rangers'.
  q?: string;
  // The ID of a team
  teamID?: number;
}

export interface SideOddsResponse extends RUWTResponse<SideOddsResult> {
  games?: Array<Game>;
  players?: Array<Player>;
  teams?: Array<Team>;
}

export interface Player {
  birthDate: string;
  country: string;
  firstName: string;
  height: number;
  lastName: string;
  number: string;
  playerID: number;
  position: string;
  sport: RUWTSport;
  teamID?: number;
  weight: number;
}

export interface SideOddsResult {
  gameID?: number;
  season: number;
  sideOdds: Array<SideOdds>;
  title: string;
  type: string;
}

export interface SideOdds {
  cutoffDate?: number;
  date: number;
  gameID?: number;
  playerID?: number;
  /**
   * Shown by itself for a one-option outright bet
   */
  price?: number;
  /**
   * Yes/Over
   */
  price1?: number;
  /**
   * No/Under
   */
  price2?: number;
  provider: RUWTOddsProvider;
  teamID?: number;
  url?: string;
  /**
   * Over/Under value
   */
  value?: number;
}

export interface PlayersParameters {
  // The RUWT or CBS ID of a player
  playerID?: number | string;
  // The RUWT or CBS ID of a team
  teamID?: number | string;
}

export interface PlayerStatisticsParameters {
  // The ID of a player
  playerID?: number;
  // The season to get stats from for prior years
  season?: number;
  // The ID of a team
  teamID?: number;
}

export interface PlayerStats extends Player {
  statistics: RUWTStatistics<number>;
}

export interface SportsResult {
  abbreviation: string;
  endDate?: number;
  hasField: boolean;
  leagues: Array<SportsLeague>;
  name: string;
  showGamesByWeek: boolean;
  startDate?: number;
}

export interface SportsLeague {
  code: RUWTLeagueCode;
  endDate?: number;
  name: string;
  showGamesByWeek: boolean;
  startDate?: number;
}

export interface StandingsParameters {
  leagueCode?: RUWTLeagueCode;
  // The abbreviation for the sport; such as mlb; nfl; or ncaab.
  sport?: RUWTSport;
}

export interface StandingsResult {
  conference: string;
  division: string;
  leagueCode: RUWTLeagueCode;
  teams: Array<StandingsTeam>;
}

export interface StandingsTeam {
  city: string;
  games_behind: number;
  losses: number;
  name: string;
  played: number;
  sport: RUWTSport;
  streak: number;
  teamID: number;
  wins: number;
  wins_percentage: string;
}

export interface TeamsParameters {
  // The abbreviation for the sport; such as mlb; nfl; or ncaab.
  sport?: RUWTSport;
  // The ID of a team
  teamID?: number;
}

export interface Team {
  city: string;
  color?: string;
  form?: string;
  initials: string;
  leagueCode: RUWTLeagueCode;
  losses?: number;
  name?: string;
  sport: RUWTSport;
  teamID: number;
  wins?: number;
}

export interface InjuriesParameters {
  // The ID of a game
  gameID?: number;
  // The ID of a player
  playerID?: number;
  // The sport
  sport?: RUWTSport;
  // The ID of a team
  teamID?: number;
}

export interface PlayerInjury extends Player {
  date: string;
  location: string;
  status: string;
}

export type RUWTStatistics<T> = KnownRUWTStatistics<T> & Record<string, T>;

interface KnownRUWTStatistics<T> {
  BASEBALL_BATTING_AT_BATS?: T;
  BASEBALL_BATTING_DOUBLES?: T;
  BASEBALL_BATTING_HITS?: T;
  BASEBALL_BATTING_HOME_RUNS?: T;
  BASEBALL_BATTING_RUNS?: T;
  BASEBALL_BATTING_RUNS_BATTED_IN?: T;
  BASEBALL_BATTING_SINGLES?: T;
  BASEBALL_BATTING_STEALS?: T;
  BASEBALL_BATTING_STOLEN_BASES?: T;
  BASEBALL_BATTING_STRIKEOUTS?: T;
  BASEBALL_BATTING_TRIPLES?: T;
  BASEBALL_BATTING_WALKS?: T;
  BASEBALL_PITCHING_BALLS?: T;
  BASEBALL_PITCHING_BATTERS_FACED?: T;
  BASEBALL_PITCHING_COMPLETE_GAME?: T;
  BASEBALL_PITCHING_HITS?: T;
  BASEBALL_PITCHING_HIT_BY_PITCH?: T;
  BASEBALL_PITCHING_HOME_RUNS?: T;
  BASEBALL_PITCHING_INNINGS_PITCHED?: T;
  BASEBALL_PITCHING_PITCHES?: T;
  BASEBALL_PITCHING_RUNS?: T;
  BASEBALL_PITCHING_RUNS_EARNED?: T;
  BASEBALL_PITCHING_STARTER?: T;
  BASEBALL_PITCHING_STRIKEOUTS?: T;
  BASEBALL_PITCHING_STRIKES?: T;
  BASEBALL_PITCHING_STRIKES_FIRST_PITCH?: T;
  BASEBALL_PITCHING_WALKS?: T;
  BASKETBALL_ASSISTS?: T;
  BASKETBALL_BLOCKS?: T;
  BASKETBALL_FIELD_GOALS_ATTEMPTED?: T;
  BASKETBALL_FIELD_GOALS_MADE?: T;
  BASKETBALL_FOULS_PERSONAL?: T;
  BASKETBALL_FREE_THROWS_ATTEMPTED?: T;
  BASKETBALL_FREE_THROWS_MADE?: T;
  BASKETBALL_MINUTES?: T;
  BASKETBALL_PLUS_MINUS?: T;
  BASKETBALL_POINTS?: T;
  BASKETBALL_REBOUNDS_DEFENSIVE?: T;
  BASKETBALL_REBOUNDS_OFFENSIVE?: T;
  BASKETBALL_STARTER?: T;
  BASKETBALL_STEALS?: T;
  BASKETBALL_THREE_POINTERS_ATTEMPTED?: T;
  BASKETBALL_THREE_POINTERS_MADE?: T;
  BASKETBALL_TURNOVERS?: T;
  FANTASY_POINTS?: T;
  FOOTBALL_DEFENSIVE_INTERCEPTIONS?: T;
  FOOTBALL_DEFENSIVE_SACKS?: T;
  FOOTBALL_DEFENSIVE_TACKLES?: T;
  FOOTBALL_DEFENSIVE_TACKLES_ASSISTS?: T;
  FOOTBALL_DEFENSIVE_TOUCHDOWNS?: T;
  FOOTBALL_FUMBLES?: T;
  FOOTBALL_FUMBLES_LOST?: T;
  FOOTBALL_FUMBLES_RECOVERED?: T;
  FOOTBALL_KICKING_EXTRA_POINTS_ATTEMPTED?: T;
  FOOTBALL_KICKING_EXTRA_POINTS_MADE?: T;
  FOOTBALL_KICKING_FIELD_GOALS_ATTEMPTED?: T;
  FOOTBALL_KICKING_FIELD_GOALS_LONG?: T;
  FOOTBALL_KICKING_FIELD_GOALS_MADE?: T;
  FOOTBALL_PASSING_ATTEMPTS?: T;
  FOOTBALL_PASSING_COMPLETIONS?: T;
  FOOTBALL_PASSING_INTERCEPTIONS?: T;
  FOOTBALL_PASSING_LONG?: T;
  FOOTBALL_PASSING_RATING?: T;
  FOOTBALL_PASSING_SACKS?: T;
  FOOTBALL_PASSING_SACKS_YARDS?: T;
  FOOTBALL_PASSING_TOUCHDOWNS?: T;
  FOOTBALL_PASSING_YARDS?: T;
  FOOTBALL_PUNTING_LONG?: T;
  FOOTBALL_PUNTING_PUNTS?: T;
  FOOTBALL_PUNTING_TOUCHBACKS?: T;
  FOOTBALL_PUNTING_YARDS?: T;
  FOOTBALL_RECEIVING_LONG?: T;
  FOOTBALL_RECEIVING_RECEPTIONS?: T;
  FOOTBALL_RECEIVING_TARGETS?: T;
  FOOTBALL_RECEIVING_TOUCHDOWNS?: T;
  FOOTBALL_RECEIVING_YARDS?: T;
  FOOTBALL_RECEIVING_YARDS_AFTER_CATCH?: T;
  FOOTBALL_RUSHING_ATTEMPTS?: T;
  FOOTBALL_RUSHING_LONG?: T;
  FOOTBALL_RUSHING_TOUCHDOWNS?: T;
  FOOTBALL_RUSHING_YARDS?: T;
  FOOTBALL_SPECIAL_TEAMS_KICK_RETURN_ATTEMPTS?: T;
  FOOTBALL_SPECIAL_TEAMS_KICK_RETURN_LONG?: T;
  FOOTBALL_SPECIAL_TEAMS_KICK_RETURN_TOUCHDOWNS?: T;
  FOOTBALL_SPECIAL_TEAMS_KICK_RETURN_YARDS?: T;
  FOOTBALL_SPECIAL_TEAMS_PUNT_RETURN_ATTEMPTS?: T;
  FOOTBALL_SPECIAL_TEAMS_PUNT_RETURN_LONG?: T;
  FOOTBALL_SPECIAL_TEAMS_PUNT_RETURN_TOUCHDOWNS?: T;
  FOOTBALL_SPECIAL_TEAMS_PUNT_RETURN_YARDS?: T;
  HOCKEY_ASSISTS?: T;
  HOCKEY_BLOCKS_MADE?: T;
  HOCKEY_GOALS?: T;
  HOCKEY_GOALTENDING_GOALS_ALLOWED?: T;
  HOCKEY_GOALTENDING_SAVES?: T;
  HOCKEY_GOALTENDING_SHOTS?: T;
  HOCKEY_HITS?: T;
  HOCKEY_PENALTIES?: T;
  HOCKEY_PENALTIES_MINUTES?: T;
  HOCKEY_PLUS_MINUS?: T;
  HOCKEY_SHIFTS?: T;
  HOCKEY_SHOTS?: T;
  HOCKEY_SHOTS_MISSED?: T;
  HOCKEY_TIME_ON_ICE_SECONDS?: T;
  SOCCER_ASSISTS?: T;
  SOCCER_FOULS_COMMITTED?: T;
  SOCCER_GOALS?: T;
  SOCCER_OFFSIDES?: T;
  SOCCER_OWN_GOALS?: T;
  SOCCER_RED_CARDS?: T;
  SOCCER_SAVES?: T;
  SOCCER_SHOTS_ON_GOAL?: T;
  SOCCER_SHOTS_TOTAL?: T;
  SOCCER_YELLOW_CARDS?: T;
}
