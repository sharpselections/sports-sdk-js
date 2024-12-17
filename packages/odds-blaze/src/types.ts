import {
  OddsBlazeLeague,
  OddsBlazeSGPSportsbooks,
  OddsBlazeSportsbooks,
} from "./enums.ts";

export type OddsBlazeSubDomains = "api" | "data" | "sgp";

// Requests

export interface OddsProps {
  league: OddsBlazeLeague;
  live?: boolean;
  main?: boolean;
  sportsbook: OddsBlazeSportsbooks | OddsBlazeSGPSportsbooks;
}

export interface BetSettlementProps {
  gradeIds: Array<string>;
}

export interface SameGameParlayProps {
  price: "decimal" | "american";
  sgpIds: Array<string>;
  sportsbook: OddsBlazeSGPSportsbooks;
}

export interface MarketsProps {
  league: OddsBlazeLeague;
}

export interface TeamsProps {
  abbreviation?: string;
  city?: string;
  conference?: string;
  division?: string;
  id?: string;
  league?: OddsBlazeLeague;
  name?: string;
  team?: string;
}

export interface PlayersProps {
  league: OddsBlazeLeague;
  playerIds?: Array<string>;
  playerPositions?: Array<string>;
}

export interface OddsStatusProps extends MarketsProps {}

// Responses

export interface OddsResponse {
  games: Array<{
    id: string;
    league: string;
    live: boolean;
    sport: string;
    sportsbooks: Array<{
      id: string;
      name: string;
      odds: Array<{
        grade: string;
        group: string;
        id: string;
        link: string;
        main: boolean;
        market: string;
        name: string;
        players: Array<{
          id: string;
          name: string;
          position: string;
          team: {
            abbreviation: string;
            id: string;
            name: string;
          };
        }>;
        points: number;
        price: string;
        sgp: string;
        updated: string;
      }>;
    }>;
    start: string;
    status: string;
    teams: {
      away: {
        abbreviation: string;
        id: string;
        name: string;
      };
      home: {
        abbreviation: string;
        id: string;
        name: string;
      };
    };
    tournament: string;
  }>;
}

export interface BetSettlementResponse {
  odds: Array<{
    game: {
      id: string;
      live: boolean;
      status: string;
      teams: {
        away: {
          abbreviation: string;
          id: string;
          name: string;
          score: number;
        };
        home: {
          abbreviation: string;
          id: string;
          name: string;
          score: number;
        };
      };
    };
    grade: string;
    market: string;
    name: string;
    players: Array<{
      name: string;
      position: string;
      score: number;
    }>;
    result: string;
  }>;
}

export interface SameGameParlayResponse {
  price: string | null;
}

export interface SportsbooksResponse {
  sportsbooks: Array<{
    clone?: {
      country?: string;
      id: string;
      name: string;
      state?: string;
    };
    country?: string;
    fantasy: boolean;
    id: string;
    name: string;
    sgp: boolean;
    state?: string;
  }>;
}

export interface MarketsResponse {
  leagues: Array<{
    id: string;
    markets: Array<{
      grade: boolean;
      id: string;
      name: string;
      period: string;
      player: boolean;
    }>;
    name: string;
    sport: string;
    updated: string;
  }>;
}

export interface TeamsResponse {
  leagues: Array<{
    id: string;
    name: string;
    sport: string;
    teams: Array<{
      abbreviation: string;
      city: string;
      conference: string;
      division: string;
      id: string;
      name: string;
      team: string;
    }>;
    updated: string;
  }>;
}

export interface PlayersResponse {
  leagues: Array<{
    id: string;
    name: string;
    sport: string;
    teams: Array<{
      abbreviation: string;
      id: string;
      name: string;
      players: Array<{
        first: string;
        id: string;
        last: string;
        name: string;
        number: string;
        position: string;
      }>;
    }>;
    updated: string;
  }>;
}

export interface OddsStatusResponse {
  leagues: Array<{
    id: string;
    name: string;
    sport: string;
    sportsbooks: Array<{
      id: string;
      link: string;
      name: string;
      odds: boolean;
    }>;
    updated: string;
  }>;
}
