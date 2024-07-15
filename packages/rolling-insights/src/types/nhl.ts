import { z } from "zod";

export const NhlScheduleSchema = z.object({
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
});

export type NhlSchedule = z.infer<typeof NhlScheduleSchema>;

export const NhlPlayerInfoSchema = z.object({
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
});

export type NhlPlayerInfo = z.infer<typeof NhlPlayerInfoSchema>;

export const NhlTeamInfoSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	abbrv: z.string(),
	arena: z.string(),
	mascot: z.string(),
	conf: z.string(),
	location: z.string(),
});

export type NhlTeamInfo = z.infer<typeof NhlTeamInfoSchema>;

const NhlPlayerSeasonStatsSchema = z.object({
	hits: z.number(),
	goals: z.number(),
	blocks: z.number(),
	assists: z.number(),
	giveaways: z.number(),
	takeaways: z.number(),
	plus_minus: z.number(),
	time_on_ice: z.number(),
	faceoffs_won: z.number(),
	games_played: z.number(),
	faceoffs_lost: z.number(),
	shots_on_goal: z.number(),
	shootout_goals: z.number(),
	penalty_minutes: z.number(),
	power_play_goals: z.number(),
	power_play_assists: z.number(),
});

export const NhlPlayerStatsSchema = z.object({
	player_id: z.number(),
	player: z.string(),
	team: z.string(),
	team_id: z.number(),
	regular_season: NhlPlayerSeasonStatsSchema,
	postseason: NhlPlayerSeasonStatsSchema.nullable(),
});

export type NhlPlayerStats = z.infer<typeof NhlPlayerStatsSchema>;

const NhlTeamSeasonStatsSchema = z.object({
	hits: z.number(),
	wins: z.number(),
	goals: z.number(),
	saves: z.number(),
	blocks: z.number(),
	losses: z.number(),
	assists: z.number(),
	power_plays: z.number(),
	faceoffs_won: z.number(),
	games_played: z.number(),
	faceoffs_lost: z.number(),
	shots_on_goal: z.number(),
	overtime_losses: z.number(),
	penalty_minutes: z.number(),
	power_plays_converted: z.number(),
	short_handed_goals_scored: z.number(),
	short_handed_goals_allowed: z.number(),
}).partial();

export const NhlTeamStatsSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	regular_season: NhlTeamSeasonStatsSchema,
	postseason: NhlTeamSeasonStatsSchema.nullable(),
});

export type NhlTeamStats = z.infer<typeof NhlTeamStatsSchema>;

