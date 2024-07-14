import { z } from "zod";

export const MlbScheduleSchema = z.object({
	away_team: z.string(),
	home_team: z.string(),
	away_team_ID: z.number(),
	home_team_ID: z.number(),
	game_ID: z.string(),
	game_time: z.string(),
	season_type: z.string(),
	season: z.string(),
	away_pitcher: z.object({ player_id: z.number().nullable(), player: z.string() }),
	home_pitcher: z.object({ player_id: z.number().nullable(), player: z.string() }),
	status: z.string(),
	event_name: z.string().nullable(),
	round: z.string().nullable(),
	city: z.string().nullable(),
	state: z.string().nullable(),
	country: z.string().nullable(),
	postal_code: z.string().nullable(),
	dome: z.number().nullable(),
	field: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	arena: z.string().nullable(),
});

export type MlbSchedule = z.infer<typeof MlbScheduleSchema>;

export const MlbPlayerInfoSchema = z.object({
	player_id: z.number(),
	player: z.string(),
	team: z.string(),
	team_id: z.number(),
	number: z.number(),
	position: z.string(),
	position_category: z.string(),
	status: z.string(),
	height: z.string(),
	weight: z.number(),
	age: z.string(),
	bats: z.string(),
	throws: z.string(),
	college: z.string().nullable(),
	all_star: z.string().nullable(),
});

export type MlbPlayerInfo = z.infer<typeof MlbPlayerInfoSchema>;

const MlbBattingStatsSchema = z.object({
	H: z.number(),
	R: z.number(),
	"1B": z.number(),
	"2B": z.number(),
	"3B": z.number(),
	AB: z.number(),
	BB: z.number(),
	CS: z.number(),
	HR: z.number(),
	PO: z.number(),
	SB: z.number(),
	SO: z.number(),
	HBP: z.number(),
	IBB: z.number(),
	RBI: z.number(),
	Outs: z.number(),
});

const MlbPitchingStatsSchema = z.object({
	H: z.number(),
	K: z.number(),
	L: z.number(),
	R: z.number(),
	S: z.number(),
	W: z.number(),
	"1B": z.number(),
	"2B": z.number(),
	"3B": z.number(),
	BB: z.number(),
	BK: z.number(),
	BS: z.number(),
	CS: z.number(),
	ER: z.number(),
	HR: z.number(),
	IP: z.string(),
	PO: z.number(),
	SB: z.number(),
	WP: z.number(),
	HBP: z.number(),
	HLD: z.number(),
	IBB: z.number(),
	ERA: z.string(),
}).optional();

const MlbPlayerSeasonStatsSchema = z.object({
	E: z.number(),
	PO: z.number(),
	batting: MlbBattingStatsSchema,
	pitching: MlbPitchingStatsSchema,
	games_played: z.number(),
});

export const MlbPlayerStatsSchema = z.object({
	player_id: z.number(),
	player: z.string(),
	position: z.string(),
	position_category: z.string(),
	team: z.string(),
	team_id: z.number(),
	regular_season: MlbPlayerSeasonStatsSchema.nullable(),
	postseason: MlbPlayerSeasonStatsSchema.nullable(),
});

export type MlbPlayerStats = z.infer<typeof MlbPlayerStatsSchema>;

const MlbTeamSeasonStatsSchema = z.object({
	E: z.number(),
	H: z.number(),
	R: z.number(),
	"2B": z.number(),
	"3B": z.number(),
	AB: z.number(),
	BB: z.number(),
	CS: z.number(),
	HR: z.number(),
	SB: z.number(),
	SO: z.number(),
	RBI: z.number(),
	wins: z.number(),
	losses: z.number(),
	games_played: z.number(),
}).optional();

export const MlbTeamStatsSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	regular_season: MlbTeamSeasonStatsSchema.nullable(),
	postseason: MlbTeamSeasonStatsSchema.nullable(),
});

export type MlbTeamStats = z.infer<typeof MlbTeamStatsSchema>;

export const MlbTeamInfoSchema = z.object({
	team_id: z.number(),
	team: z.string(),
	conf: z.string(),
	abbrv: z.string().nullable(),
	mascot: z.string().nullable(),
	location: z.string().nullable(),
	city: z.string().nullable(),
	state: z.string().nullable(),
	arena: z.string().nullable(),
	country: z.string().nullable(),
	latitude: z.number().nullable(),
	longitude: z.number().nullable(),
	field: z.string().nullable(),
	postal_code: z.string().nullable(),
	dome: z.number().nullable(),
});

export type MlbTeamInfo = z.infer<typeof MlbTeamInfoSchema>;