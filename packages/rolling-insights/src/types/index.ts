import * as nba from "./nba";
import * as nhl from "./nhl";
import * as nfl from "./nfl";
import * as mlb from "./mlb";
import {League} from "@sports-sdk/core";

export type { MlbTeamInfo, MlbPlayerInfo, MlbPlayerStats, MlbSchedule, MlbTeamStats } from "./mlb";
export {
	MlbTeamInfoSchema, MlbTeamStatsSchema, MlbPlayerStatsSchema, MlbPlayerInfoSchema, MlbScheduleSchema,
} from "./mlb";
export type { NbaPlayerInfo, NbaTeamInfo, NbaSchedule, NbaPlayerStats, NbaTeamStats } from "./nba";
export {
	NbaPlayerInfoSchema, NbaPlayerStatsSchema, NbaScheduleSchema, NbaTeamInfoSchema, NbaTeamStatsSchema,
} from "./nba";
export type { NflPlayerInfo, NflPlayerStats, NflSchedule, NflTeamInfo, NflTeamStats } from "./nfl";
export {
	NflScheduleSchema, NflTeamInfoSchema, NflTeamStatsSchema, NflPlayerInfoSchema, NflPlayerStatsSchema,
} from "./nfl";
export type { NhlPlayerInfo, NhlPlayerStats, NhlSchedule, NhlTeamInfo, NhlTeamStats } from "./nhl";
export {
	NhlTeamInfoSchema, NhlTeamStatsSchema, NhlPlayerStatsSchema, NhlPlayerInfoSchema, NhlScheduleSchema,
} from "./nhl";

export type LeagueScheduleMap = {
	[League.EPL]: mlb.MlbSchedule;
	[League.MLB]: mlb.MlbSchedule;
	[League.NBA]: nba.NbaSchedule;
	[League.NCAAF]: mlb.MlbSchedule;
	[League.NFL]: nfl.NflSchedule;
	[League.NHL]: nhl.NhlSchedule;
};

export type LeagueTeamInfoMap = {
	[League.EPL]: mlb.MlbTeamInfo;
	[League.MLB]: mlb.MlbTeamInfo;
	[League.NBA]: nba.NbaTeamInfo;
	[League.NCAAF]: mlb.MlbTeamInfo;
	[League.NFL]: nfl.NflTeamInfo;
	[League.NHL]: nhl.NhlTeamInfo;
};
export type LeaguePlayerInfoMap = {
	[League.EPL]: mlb.MlbPlayerInfo;
	[League.MLB]: mlb.MlbPlayerInfo;
	[League.NBA]: nba.NbaPlayerInfo;
	[League.NCAAF]: mlb.MlbPlayerInfo;
	[League.NFL]: nfl.NflPlayerInfo;
	[League.NHL]: nhl.NhlPlayerInfo;
};
export type LeagueTeamStatsMap = {
	[League.EPL]: mlb.MlbTeamStats;
	[League.MLB]: mlb.MlbTeamStats;
	[League.NBA]: nba.NbaTeamStats;
	[League.NCAAF]: mlb.MlbTeamStats;
	[League.NFL]: nfl.NflTeamStats;
	[League.NHL]: nhl.NhlTeamStats;
};
export type LeaguePlayerStatsMap = {
	[League.EPL]: mlb.MlbPlayerStats;
	[League.MLB]: mlb.MlbPlayerStats;
	[League.NBA]: nba.NbaPlayerStats;
	[League.NCAAF]: mlb.MlbPlayerStats;
	[League.NFL]: nfl.NflPlayerStats;
	[League.NHL]: nhl.NhlPlayerStats;
};
