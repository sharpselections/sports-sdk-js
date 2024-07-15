import { z } from "zod";
import {nullish} from "@sports-sdk/core";

// Enums
const SeasonTypeEnum = z.enum(["pre", "post", "regular"]);
const StatusEnum = z.enum(["pre_draft", "drafting", "in_season", "complete"]);
const TransactionTypeEnum = z.enum(["trade", "free_agent", "waiver"]);

// State schema
export const StateSchema = nullish(
	z.object({
		week: z.number(),
		season_type: SeasonTypeEnum,
		season_start_date: z.string(),
		season: z.string(),
		previous_season: z.string(),
		leg: z.number(),
		league_season: z.string(),
		league_create_season: z.string(),
		display_week: z.number(),
	}),
);
export type State = z.infer<typeof StateSchema>;

// User schema
export const UserSchema = nullish(
	z.object({
		user_id: z.string(),
		username: z.string(),
		display_name: z.string(),
		avatar: z.string().nullable(),
	}),
);
export type User = z.infer<typeof UserSchema>;

// UserInfo schema
export const UserInfoSchema = nullish(
	z.object({
		user_id: z.string(),
		username: z.string(),
		display_name: z.string(),
		avatar: z.string().nullable(),
		metadata: z.record(z.any()),
		is_owner: z.boolean(),
	}),
);
export type UserInfo = z.infer<typeof UserInfoSchema>;

// LeagueInfo schema
export const LeagueInfoSchema = nullish(
	z.object({
		total_rosters: z.number(),
		status: StatusEnum,
		sport: z.string(),
		settings: z.record(z.any()),
		season_type: SeasonTypeEnum,
		season: z.string(),
		scoring_settings: z.record(z.any()),
		roster_positions: z.array(z.string()),
		previous_league_id: z.string().nullable(),
		name: z.string(),
		league_id: z.string(),
		draft_id: z.string(),
		avatar: z.string().nullable(),
	}),
);
export type LeagueInfo = z.infer<typeof LeagueInfoSchema>;

// RosterSettings schema
export const RosterSettingsSchema = nullish(
	z.object({
		wins: z.number(),
		waiver_position: z.number(),
		waiver_budget_used: z.number(),
		total_moves: z.number(),
		ties: z.number(),
		losses: z.number(),
		fpts: z.number(),
	}),
);
export type RosterSettings = z.infer<typeof RosterSettingsSchema>;

// Roster schema
export const RosterSchema = nullish(
	z.object({
		taxi: z.array(z.union([z.string(), z.any()])),
		starters: z.array(z.union([z.string(), z.any()])),
		settings: RosterSettingsSchema,
		roster_id: z.number(),
		reserve: z.array(z.union([z.string(), z.any()])).nullable(),
		players: z.array(z.union([z.string(), z.any()])),
		player_map: z.record(z.any()).nullable(),
		owner_id: z.string(),
		metadata: z.record(z.any()).nullable(),
		league_id: z.string(),
		keepers: z.array(z.string()).nullable(),
		co_owners: z.array(z.string()).nullable(),
	}),
);
export type Roster = z.infer<typeof RosterSchema>;

// Matchup schema
export const MatchupSchema = nullish(
	z.object({
		starters: z.array(z.union([z.string(), z.any()])),
		roster_id: z.number(),
		players: z.array(z.union([z.string(), z.any()])),
		matchup_id: z.number(),
		points: z.number(),
		custom_points: z.number().nullable(),
	}),
);
export type Matchup = z.infer<typeof MatchupSchema>;

// PlayoffMatchup schema
export const PlayoffMatchupSchema = nullish(
	z.object({
		r: z.number(),
		m: z.number(),
		t1: z.union([z.number(), z.object({ w: z.number() })]),
		t2: z.union([z.number(), z.object({ l: z.number() })]),
		w: z.number().nullable(),
		l: z.number().nullable(),
		t1_from: z
			.object({ w: z.number().optional(), l: z.number().optional() })
			.optional(),
		t2_from: z
			.object({ w: z.number().optional(), l: z.number().optional() })
			.optional(),
		p: z.number().optional(),
	}),
);
export type PlayoffMatchup = z.infer<typeof PlayoffMatchupSchema>;

// DraftPick schema
export const DraftPickSchema = nullish(
	z.object({
		season: z.string(),
		round: z.number(),
		roster_id: z.number(),
		previous_owner_id: z.number().nullable(),
		owner_id: z.number(),
	}),
);
export type DraftPick = z.infer<typeof DraftPickSchema>;

// WaiverBudget schema
export const WaiverBudgetSchema = nullish(
	z.object({
		sender: z.number(),
		receiver: z.number(),
		amount: z.number(),
	}),
);
export type WaiverBudget = z.infer<typeof WaiverBudgetSchema>;

// TransactionPlayer schema
export const TransactionPlayerSchema = nullish(
	z.object({
		roster_id: z.number(),
		player: z.any(),
	}),
);
export type TransactionPlayer = z.infer<typeof TransactionPlayerSchema>;

// Transaction schema
export const TransactionSchema = nullish(
	z.object({
		type: TransactionTypeEnum,
		transaction_id: z.string(),
		status_updated: z.number(),
		status: z.string(),
		settings: z.record(z.any()).nullable(),
		roster_ids: z.array(z.number()),
		metadata: z.record(z.any()).nullable(),
		leg: z.number(),
		drops: z.union([
			z.record(z.number()),
			z.array(TransactionPlayerSchema),
			z.null(),
		]),
		draft_picks: z.array(DraftPickSchema),
		creator: z.string(),
		created: z.number(),
		consenter_ids: z.array(z.number()),
		adds: z.union([
			z.record(z.number()),
			z.array(TransactionPlayerSchema),
			z.null(),
		]),
		waiver_budget: z.array(WaiverBudgetSchema),
	}),
);
export type Transaction = z.infer<typeof TransactionSchema>;

// DraftSettings schema
export const DraftSettingsSchema = nullish(
	z.object({
		teams: z.number(),
		slots_wr: z.number(),
		slots_te: z.number(),
		slots_rb: z.number(),
		slots_qb: z.number(),
		slots_k: z.number(),
		slots_flex: z.number(),
		slots_def: z.number(),
		slots_bn: z.number(),
		rounds: z.number(),
		pick_timer: z.number(),
	}),
);
export type DraftSettings = z.infer<typeof DraftSettingsSchema>;

// DraftMetadata schema
export const DraftMetadataSchema = nullish(
	z.object({
		scoring_type: z.string(),
		name: z.string(),
		description: z.string(),
	}),
);
export type DraftMetadata = z.infer<typeof DraftMetadataSchema>;

// Draft schema
export const DraftSchema = nullish(
	z.object({
		type: z.string(),
		status: z.string(),
		start_time: z.number(),
		sport: z.string(),
		settings: DraftSettingsSchema,
		season_type: z.string(),
		season: z.string(),
		metadata: DraftMetadataSchema,
		league_id: z.string(),
		last_picked: z.number().nullable(),
		last_message_time: z.number().nullable(),
		last_message_id: z.string().nullable(),
		draft_order: z.record(z.number()).optional(),
		slot_to_roster_id: z.record(z.number()).optional(),
		draft_id: z.string(),
		creators: z.record(z.any()).nullable(),
		created: z.number(),
	}),
);
export type Draft = z.infer<typeof DraftSchema>;

// PlayerDraftMetadata schema
export const PlayerDraftMetadataSchema = nullish(
	z.object({
		team: z.string(),
		status: z.string(),
		sport: z.string(),
		position: z.string(),
		player_id: z.string(),
		number: z.string(),
		news_updated: z.string(),
		last_name: z.string(),
		injury_status: z.string(),
		first_name: z.string(),
	}),
);
export type PlayerDraftMetadata = z.infer<typeof PlayerDraftMetadataSchema>;

// PlayerDraftPick schema
export const PlayerDraftPickSchema = nullish(
	z.object({
		player_id: z.string(),
		player: z.any().optional(),
		picked_by: z.string(),
		roster_id: z.string(),
		round: z.number(),
		draft_slot: z.number(),
		pick_no: z.number(),
		metadata: PlayerDraftMetadataSchema,
		is_keeper: z.boolean().nullable(),
		draft_id: z.string(),
	}),
);
export type PlayerDraftPick = z.infer<typeof PlayerDraftPickSchema>;

// TrendingPlayer schema
export const TrendingPlayerSchema = nullish(
	z.object({
		player_id: z.string(),
		player: z.any().optional(),
		count: z.number(),
	}),
);
export type TrendingPlayer = z.infer<typeof TrendingPlayerSchema>;

// Player schema
export const PlayerSchema = nullish(
	z.object({
		player_id: z.string(),
		first_name: z.string(),
		last_name: z.string(),
		position: z.string(),
		team: z.string().nullable(),
		status: z.string(),
		number: z.number(),
		height: z.string(),
		weight: z.string(),
		college: z.string(),
		years_exp: z.number(),
		fantasy_positions: z.array(z.string()).nullable(),
		depth_chart_position: z.string().nullable(),
		depth_chart_order: z.number().nullable(),
		metadata: z.record(z.any()).nullable(),
		yahoo_id: z.union([z.string(), z.number()]).nullable(),
		rotowire_id: z.union([z.string(), z.number()]).nullable(),
		espn_id: z.union([z.string(), z.number()]).nullable(),
		active: z.boolean(),
		latest_news: z.any().nullable(),
		sport: z.string(),
		full_name: z.string(),
		birth_date: z.string().nullable(),
		search_rank: z.number(),
		injury_status: z.string().nullable(),
		injury_body_part: z.string().nullable(),
		injury_notes: z.string().nullable(),
		injury_start_date: z.string().nullable(),
		practice_participation: z.string().nullable(),
		practice_description: z.string().nullable(),
		gsis_id: z.union([z.string(), z.number()]).nullable(),
		sportradar_id: z.union([z.string(), z.number()]),
		stats_id: z.union([z.string(), z.number()]).nullable(),
		fantasy_data_id: z.union([z.string(), z.number()]).nullable(),
		rotoworld_id: z.union([z.string(), z.number()]).nullable(),
		pff_id: z.union([z.string(), z.number()]).nullable(),
		swish_id: z.union([z.string(), z.number()]).nullable(),
		pandascore_id: z.union([z.string(), z.number()]).nullable(),
		oddsjam_id: z.union([z.string(), z.number()]).nullable(),
		dl_trading_id: z.union([z.string(), z.number()]).nullable(),
		search_first_name: z.string(),
		search_last_name: z.string(),
		search_full_name: z.string(),
		hashtag: z.string(),
		news_updated: z.number().nullable(),
		birth_city: z.string().nullable(),
		birth_state: z.string().nullable(),
		birth_country: z.string().nullable(),
		high_school: z.string().nullable(),
	}),
);
export type Player = z.infer<typeof PlayerSchema>;

// PlayersResponse schema
// export const PlayersResponseSchema = z.record(PlayerSchema);
// export type PlayersResponse = z.infer<typeof PlayersResponseSchema>;
