import {z} from "zod";

export const PlayerRankingsSchema = z.object({
    playerId: z.string().describe("A unique reference ID for a specific player"),
    name: z.string().describe("The player or team name"),
    team: z.string().describe("An alias of team_code"),
    position: z.string().describe("A player's primary position"),
    // NBA returns this as string, making design choice to parse as a number
    rank: z.coerce.number().describe("An ordinal ranking"),
    rank_position: z.number().describe("The player's rank among players of the same position")
});

const PlayerDepthChartSchema = z.object({
    playerId: z.string().describe("A unique reference ID for a specific player"),
    name: z.string().describe("The player or team name"),
    position: z.string().describe("A player's primary position"),
    depth: z.string().describe('The ordinal ranking on the depth chart. "1" indicates the starter'),
    team: z.string().optional()
});

const positionSchema = z.record(z.array(PlayerDepthChartSchema));

export const DepthChartsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    charts: z.record(positionSchema)
});

export type DepthChartsResponse = z.infer<typeof DepthChartsResponseSchema>;


export const PlayerStatSchema = z.object({
    name: z.string().describe("The player or team name"),
    position: z.string().describe("A player's primary position"),
    team: z.string().describe("An alias of team_code"),
    playerId: z.string().describe("A unique reference ID for a specific player"),
});

export const NewsResponseSchema = z.array(
    z.object({
        article_headline: z.string().describe("The headline for a specific article"),
        article_date: z.string().describe("The date that an article was added to the Fantasy Nerds system"),
        article_author: z.string().describe("The author of an article"),
        article_excerpt: z.string().describe("A short snippet of an article if available."),
        article_link: z.string().describe("The article URL to view the full story"),
        playerIds: z.array(z.string().nullish().describe("An array of Fantasy Nerds playerIds")),
        teams: z.array(z.string().nullish().describe("An array of team codes"))
    })
);

export type NewsResponse = z.infer<typeof NewsResponseSchema>;

export const TeamsSchema = z.object({
    team_code: z.string().describe("The abbreviation for a team name"),
    team_name: z.string().describe("The full name of a team"),
    logo_small: z.string().describe("URL for the small team logo"),
    logo_medium: z.string().describe("URL for the medium team logo"),
    logo_standard: z.string().describe("URL for the standard team logo")
});

const TeamsResponseSchema = z.array(
    TeamsSchema
);

export type TeamsResponse = z.infer<typeof TeamsResponseSchema>;

export const PlayerSchema = z.object({
    active: z.string().describe("A designation for a player who is either on a team or is eligible to be."),
    college: z.string().nullish().describe("The college that the player attended"),
    dob: z.string().describe("A player's date of birth in YYYY-MM-DD"),
    height: z.string().describe("A player's height in feet and inches"),
    name: z.string().describe("The player or team name"),
    playerId: z.string().describe("A unique reference ID for a specific player"),
    position: z.string().describe("A player's primary position"),
    position_category: z.string().describe("A generalized category for a specific position."),
    star: z.string().describe("A Fantasy Nerds designation for a player who is generally more fantasy-relevant than others"),
    team: z.string().describe("An alias of team_code"),
    weight: z.string().nullish().describe("A player's weight in lbs")
});

const PlayerResponseSchema = z.array(
    PlayerSchema
);

export type PlayersResponse = z.infer<typeof PlayerResponseSchema>;

export const GameSchema = z.object({
    gameId: z.string().describe("A unique reference ID for a specific game"),
    game_date: z.string().describe("The datetime for the game. All times are in the Eastern timezone."),
    away_team: z.string().describe("The visiting team code"),
    home_team: z.string().describe("The home team code"),
    winner: z.string().describe("The winner of the contest"),
    away_score: z.string().describe("The final score for the visiting team"),
    home_score: z.string().describe("The final score for the home team")
});

export const WeatherSchema = z.object({
    gameId: z.string().describe("A unique reference ID for a specific game"),
    away_team: z.string().describe("The visiting team code"),
    home_team: z.string().describe("The home team code"),
    game_date: z.string().describe("The datetime for the game. All times are in the Eastern timezone."),
    low_temp: z.string().describe("The forecasted low temperature for a game"),
    high_temp: z.string().describe("The forecasted high temperature for a game"),
    forecast: z.string().describe("A description of the weather forecast"),
    wind_chill: z.string().describe("The wind chill in Fahrenheit"),
    wind_speed: z.string().describe("The wind speed in mph"),
    icon_small: z.string().describe("URL for the small weather icon"),
    icon_medium: z.string().describe("URL for the medium weather icon"),
    icon_large: z.string().describe("URL for the large weather icon")
});

export const InjuriesSchema = z.object({
    playerId: z.string(),
    name: z.string(),
    position: z.string(),
    injury: z.string(),
    game_status: z.string(),
    last_update: z.string()
});