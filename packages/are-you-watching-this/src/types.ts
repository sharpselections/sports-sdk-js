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
    gameID?: string;
    // If enabled on your account; game-specific projections for individual players will be included
    includePlayerProjections?: boolean;
    // If providerCoordinates is specified; an affiliation like 'CBS' or 'NBC' can be used to filter stations
    providerAffiliation?: string;
    // Coordinates for nearby over-the-air stations [latitude; longitude]
    providerCoordinates?: [number, number];
    // The ID of a cable or satellite provider
    providerID?: string;
    // The abbreviation for the sports; such as mlb; nfl; or ncaab.
    sports?: Array<string>;
    // The ID of a team
    teamID?: string;
}

export interface Game {
    competition?: string;
    date: number
    gameID: number;
    headline?: string;
    highPoints: number;
    insights?: Array<string>;
    label?: string;
    leagueCode: string;
    location?: string;
    points: number;
    pointsLevel: string;
    programIDs?: Array<string>
    rationale?: string;
    round?: string
    seasonSection?: string;
    sport: string
    team1City?: string;
    team1Color?: string;
    team1ID?: number
    team1Initials?: string
    team1Name?: string;
    team1Score?: number;
    team2City?: string;
    team2Color?: string;
    team2ID?: number;
    team2Initials?: string;
    team2Name?: string;
    team2Score?: number
    time: number
    timeLeft?: string
}

export interface GameOddsParameters {
    // The ID of a game
    gameID?: string;
    // Whether you want the historical odds; requires gameID to be provided
    history?: boolean;
    // The odds provider
    provider?: string;
    // Free-text query like 'yankees' or 'nhl/rangers'.
    q?: string;
    // The abbreviation for the sport; such as mlb; nfl; or ncaab.
    sport?: string;
    // The ID of a team
    teamID?: string;
}

export interface GameOddsResult {
    date: number;
    gameID: number;
    headline: string;
    highPoints: number;
    leagueCode: string;
    location: string;
    odds: Array<GameOdds>;
    points: number;
    pointsLevel: string;
    rotationNumber1?: number;
    rotationNumber2?: number;
    sport: string;
    team1City: string;
    team1Color: string;
    team1ID: number;
    team1Initials: string;
    team1Name: string;
    team1Score?: number;
    team2City: string;
    team2Color: string;
    team2ID: number;
    team2Initials: string;
    team2Name: string;
    team2Score?: number;
    time?: number;
    timeLeft?: string
}

export interface GameOdds {
    date: number
    moneyLine1?: number;
    moneyLine2?: number;
    overUnder?: number;
    overUnderLineOver?: number;
    overUnderLineUnder?: number;
    provider: string;
    spread?: number;
    spreadLine1?: number;
    spreadLine2?: number;
    url?: string
}

export interface OddsSplitsParameters {
    // The ID of a game
    gameID?: string;
    leagueCode?: string;
    // The abbreviation for the sport; such as mlb; nfl; or ncaab.
    sport?: string;
    // The ID of a team
    teamID?: string;
}

export interface SideOddsParameters {
    // The ID of a game
    gameID?: string;
    leagueCode?: string;
    playerID?: string;
    // Free-text query like 'yankees' or 'nhl/rangers'.
    q?: string;
    // The ID of a team
    teamID?: string;
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
    sport: string
    teamID?: number;
    weight: number
}

export interface SideOddsResult {
    gameID?: number
    season: number;
    sideOdds: Array<SideOdds>;
    title: string;
    type: string
}

export interface SideOdds {
    cutoffDate?: number;
    date: number
    gameID?: number;
    playerID: number;
    price?: number;
    price1?: number;
    price2?: number;
    provider: string;
    url?: string;
    value?: number
}

export interface PlayersParameters {
    // The RUWT or CBS ID of a player
    playerID?: number | string;
    // The RUWT or CBS ID of a team
    teamID?: number | string
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
    statistics: {
        // TODO see if we can get the enums that can be returned here
        [key: string]: number;
    }
}

export interface SportsResult {
    abbreviation: string;
    endDate?: number;
    hasField: boolean;
    leagues: Array<SportsLeague>;
    name: string;
    showGamesByWeek: boolean;
    startDate?: number
}

export interface SportsLeague {
    code: string
    endDate?: number
    name: string;
    showGamesByWeek: boolean;
    startDate?: number
}

export interface StandingsParameters {
    leagueCode?: string;
    // The abbreviation for the sport; such as mlb; nfl; or ncaab.
    sport?: string;
}

export interface StandingsResult {
    conference: string;
    division: string;
    leagueCode: string;
    teams: Array<StandingsTeam>;
}

export interface StandingsTeam {
    city: string;
    games_behind: number;
    losses: number;
    name: string;
    played: number;
    sport: string;
    streak: number;
    teamID: number;
    wins: number;
    wins_percentage: string;
}

export interface TeamsParameters {
    // The abbreviation for the sport; such as mlb; nfl; or ncaab.
    sport?: string;
    // The ID of a team
    teamID?: number;
}

export interface Team {
    city: string;
    color?: string;
    form?: string;
    initials: string;
    leagueCode: string;
    losses?: number;
    name?: string;
    sport: string;
    teamID: number;
    wins?: number;
}