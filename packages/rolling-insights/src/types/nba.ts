import { z } from "zod";

const NbaTeamSeasonStatsSchema = z.object({
	wins: z.number(),
	fouls: z.number(),
	blocks: z.number(),
	losses: z.number(),
	points: z.number(),
	steals: z.number(),
	assists: z.number(),
	turnovers: z.number(),
	games_played: z.number(),
	total_rebounds: z.number(),
	two_points_made: z.number(),
	field_goals_made: z.number(),
	free_throws_made: z.number(),
	three_points_made: z.number(),
	defensive_rebounds: z.number(),
	offensive_rebounds: z.number(),
	two_point_percentage: z.number().optional(),
	two_points_attempted: z.number(),
	field_goals_attempted: z.number(),
	free_throws_attempted: z.number(),
	three_points_attempted: z.number(),
});
export const NbaTeamStatsSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	regular_season: NbaTeamSeasonStatsSchema,
	postseason: NbaTeamSeasonStatsSchema.nullable(),
});

export type NbaTeamStats = z.infer<typeof NbaTeamStatsSchema>;

const NbaPlayerSeasonStatsSchema = z.object({
	fouls: z.number(),
	blocks: z.number(),
	points: z.number(),
	steals: z.number(),
	assists: z.number(),
	minutes: z.number(),
	turnovers: z.number(),
	games_played: z.number(),
	total_rebounds: z.number(),
	two_points_made: z.number(),
	field_goals_made: z.number(),
	free_throws_made: z.number(),
	three_points_made: z.number(),
	defensive_rebounds: z.number(),
	offensive_rebounds: z.number(),
	two_point_percentage: z.number(),
	two_points_attempted: z.number(),
	field_goals_attempted: z.number(),
	free_throws_attempted: z.number(),
	three_points_attempted: z.number(),
});

export const NbaPlayerStatsSchema = z.object({
	player_id: z.number(),
	player: z.string(),
	team: z.string(),
	team_id: z.number(),
	regular_season: NbaPlayerSeasonStatsSchema,
	postseason: NbaPlayerSeasonStatsSchema.nullable(),
});

export type NbaPlayerStats = z.infer<typeof NbaPlayerStatsSchema>;

export const NbaPlayerInfoSchema = z.object({
	player_id: z.number(),
	player: z.string(),
	team_id: z.number(),
	team: z.string(),
	number: z.number(),
	status: z.string(),
	position: z.string(),
	position_category: z.string(),
	height: z.string(),
	weight: z.number(),
	age: z.string(),
	college: z.string(),
});

export type NbaPlayerInfo = z.infer<typeof NbaPlayerInfoSchema>;

export const NbaTeamInfoSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	abbrv: z.string(),
	arena: z.string(),
	mascot: z.string(),
	conf: z.string(),
	location: z.string(),
});

export type NbaTeamInfo = z.infer<typeof NbaTeamInfoSchema>;

export const NbaScheduleSchema = z.object({
  away_team: z.string(),
  home_team: z.string(),
  away_team_ID: z.number(),
  home_team_ID: z.number(),
  game_ID: z.string(),
  game_time: z.string(),
  season_type: z.string(),
  event_name: z.string().nullable(),
  round: z.number().nullable(),
  season: z.string(),
  status: z.string(),
  broadcast: z.string()
});

export type NbaSchedule = z.infer<typeof NbaScheduleSchema>;