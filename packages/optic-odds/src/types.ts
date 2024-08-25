// Requests

export interface CommonProps {
    id?: string[];
    league?: string[];
    sport?: string[];
}

export interface PagedProps extends CommonProps {
    page?: string;
}

export interface CommonOddsProps {
    is_main?: boolean;
    league?: string[];
    name?: string[];
    odds_format?: 'AMERICAN' | 'DECIMAL' | 'PROBABILITY';
    player_id?: string[];
    sportsbook: string[],
    team_id?: string[];
}

export interface GetLeaguesProps {
    active?: boolean;
    sport: string[];
}

export interface GetMarketsProps {
    league?: string;
    sport?: string;
    sportsbook?: string;
}

export interface GetPlayersProps extends PagedProps {
    include_statsperform_id?: boolean;
    team_id?: [];
}

export interface GetSportsbooksProps {
    fixture_id?: string;
    league?: string;
    sport?: string;
}

export interface GetTeamsProps extends PagedProps {
    conference?: [];
    division?: [];
    include_statsperform_id?: boolean;
}

export interface GetInjuriesProps extends Omit<CommonProps, "ids"> {
    team_id?: [];
}

export interface GetFuturesProps {
    league?: [];
    tournament_ids: [];
}

export interface GetFuturesOddsProps extends CommonOddsProps {
    future?: string[];
    future_id?: string[];
}

export interface GetFixturesPlayerResultsProps {
    fixture_id?: string[];
    player_id?: string[];
    status?: string;
    team_id?: string[];
}

export interface GetPlayersResultsProps {
    lookback_num?: string;
    player_id?: string[];
    season_year?: string;
    team_id?: string;
}

export interface GetFixtureResultsProps {
    fixture_id?: string[];
    lookback_num?: string;
    team_id?: string[];
}

export interface GetH2HResultsProps {
    lookback_num?: string;
    team1_id: string;
    team2_id: string;
}

export interface GetOddsProps extends Omit<CommonOddsProps, "names" | "leagues"> {
    fixture_id?: string[];
    market?: string[];
}

export interface GetFixturesProps extends GetTeamsProps {
    active?: boolean;
    include_starting_lineups?: boolean;
    is_live?: boolean;
    season_type?: string;
    season_week?: string;
    season_year?: string;
    start_date?: string;
    start_date_after?: string;
    start_date_before?: string;
    team_id?: string[];
}

type DynamicObject = { [key: string]: any };

// Responses

export interface BaseEntity {
    id: string;
    name: string;
}

export interface BaseResponse<T> {
    data: Array<T>;
}

export interface BaseResult {
    fixture: BaseFixture;
    league: BaseEntity;
    sport: BaseEntity;
}

export interface PaginatedResponse<T> extends BaseResponse<T> {
    page: number;
    total_pages: number;
}

export type Competitor = BaseEntity & {
    abbreviation: string | null;
    logo: string | null;
}

export type BaseInPlayData = {
    clock?: string | null;
    last_play?: string | null;
    period?: string | null;
}

export type InPlayData = BaseInPlayData & {
    balls?: number | null;
    batter?: DynamicObject | null;
    distance_to_go?: string | null;
    down?: number | null;
    outs?: number | null;
    pitcher?: DynamicObject | null;
    possession?: string | null;
    runners?: DynamicObject | null;
    strikes?: number | null;
    time_min?: number | null;
    time_sec?: number | null;
}

export type LineupPlayer = {
    player_batting_throwing: string | null;
    player_id: string | null;
    player_name: string | null;
    player_position: string | null;
    player_team: string | null;
}

export type Result<T extends BaseInPlayData> = {
    in_play_data: T | null,
    scores: TeamScores;
} | null;

export type RetirementInfo = {
    winner: string;
    winner_team_id: string;
} | null;

export type Stats = { [key: string]: number };

export type TeamScore = {
    aggregate?: number | null;
    periods?: DynamicObject | null;
    total?: number | null;
}

export type TeamScores = {
    away: TeamScore,
    home: TeamScore,
} | null;

export type PeriodStats = Array<{
    period: string;
    stats: Stats;
}>;

export type Tournament = BaseEntity & { start_date: string; } | null;

export interface BaseFixture {
    away_competitors: Array<Competitor>,
    away_team_display: string | null,
    game_id: string | null,
    home_competitors: Array<Competitor>,
    home_team_display: string | null,
    id: string,
    is_live: boolean,
    start_date: string,
    status: string,
}

export interface FixtureEntity extends BaseFixture {
    away_rotation_number?: number | null,
    away_starter: string | null,
    broadcast: string | null,
    has_odds: boolean,
    home_rotation_number?: number | null,
    home_starter: string | null,
    league: BaseEntity,
    lineups: {
        away: Array<LineupPlayer>,
        home: Array<LineupPlayer>
    } | null,
    result?: Result<BaseInPlayData>,
    season_type: string | null,
    season_week: string | null,
    season_year: string | null,
    source_ids: DynamicObject | null;
    sport: BaseEntity,
    tournament: Tournament,
    tournament_stage: string | null,
    venue_location: string | null,
    venue_name: string | null,
    venue_neutral: boolean,
    weather: string | null,
    weather_temp: string | null,
}

export interface FixturePlayerResults extends BaseResult {
    results: Array<{
        player: BasePlayerEntity;
        stats: PeriodStats;
        status: string;
        team: BaseEntity | null;
    }>
}

export interface FixtureTeamResults extends BaseResult {
    events: Array<any>;
    in_play: InPlayData | null;
    retirement_info: RetirementInfo;
    scores: TeamScores;
    stats: {
        away: PeriodStats;
        home: PeriodStats;
    };
}

export interface FixtureOdds extends FixtureEntity {
    odds: Array<OddsEntityWithLinks>;
}

export interface FutureEntity extends BaseEntity {
    future_type: string | null;
    league: BaseEntity;
    sport: BaseEntity;
    start_date: string;
    tournament: Tournament;
}

export interface FutureOdds extends FutureEntity {
    odds: Array<OddsEntity>;
}

export interface LeagueEntity extends BaseEntity {
    region: string;
    region_code?: string | null;
    sport: BaseEntity & { main_markets?: Array<BaseEntity> };
}

export interface MarketsEntity extends BaseEntity {
    sports: Array<BaseEntity & { leagues: Array<BaseEntity & { sportsbooks: Array<BaseEntity> }> }>;
}

export interface OddsEntity extends BaseEntity {
    is_main: boolean;
    market: string;
    market_id: string;
    normalized_selection: string;
    player_id?: string | null;
    points?: number | null;
    price: number;
    selection: string;
    selection_line?: string | null;
    sportsbook: string;
    team_id?: string | null;
    timestamp: number;
}

export interface OddsEntityWithLinks extends OddsEntity {
    deep_link: {
        android?: string;
        desktop?: string;
        ios?: string;
    } & DynamicObject | null;
    grouping_key: string | null;
}

export interface BasePlayerEntity extends BaseEntity {
    number?: number | null;
    position?: string | null;
}

export interface PlayerEntity extends BasePlayerEntity {
    age?: number | null;
    experience: number | null;
    first_name: string | null;
    height?: number | null;
    is_active: boolean;
    last_name: string | null;
    league: BaseEntity;
    logo: string | null;
    source_ids: DynamicObject | null;
    sport: BaseEntity;
    team: BaseEntity;
    weight?: number | null;
}

export interface PlayerInjuryEntity {
    id: string;
    league: BaseEntity;
    player: BasePlayerEntity;
    sport: BaseEntity;
    status: string;
    team: BaseEntity;
    type: string;
}

export interface SportsbookEntity extends BaseEntity {
    is_active: boolean;
    is_onshore: boolean;
    logo: string;
}


export interface TeamEntity extends BaseEntity {
    abbreviation: string | null;
    city?: string | null;
    conference?: string | null;
    division?: string | null;
    is_active: boolean;
    league: BaseEntity;
    logo: string;
    mascot?: string | null;
    nickname?: string | null;
    source_ids: DynamicObject | null;
    sport: BaseEntity;
}
