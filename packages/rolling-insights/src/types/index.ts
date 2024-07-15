import * as nba from "./nba";
import * as nhl from "./nhl";
import * as nfl from "./nfl";
import * as mlb from "./mlb";
import {Sport} from "@sports-sdk/core";

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

export type SportScheduleMap = {
	[Sport.EPL]: mlb.MlbSchedule;
	[Sport.MLB]: mlb.MlbSchedule;
	[Sport.NBA]: nba.NbaSchedule;
	[Sport.NCAAF]: mlb.MlbSchedule;
	[Sport.NFL]: nfl.NflSchedule;
	[Sport.NHL]: nhl.NhlSchedule;
};

export type SportTeamInfoMap = {
	[Sport.EPL]: mlb.MlbTeamInfo;
	[Sport.MLB]: mlb.MlbTeamInfo;
	[Sport.NBA]: nba.NbaTeamInfo;
	[Sport.NCAAF]: mlb.MlbTeamInfo;
	[Sport.NFL]: nfl.NflTeamInfo;
	[Sport.NHL]: nhl.NhlTeamInfo;
};
export type SportPlayerInfoMap = {
	[Sport.EPL]: mlb.MlbPlayerInfo;
	[Sport.MLB]: mlb.MlbPlayerInfo;
	[Sport.NBA]: nba.NbaPlayerInfo;
	[Sport.NCAAF]: mlb.MlbPlayerInfo;
	[Sport.NFL]: nfl.NflPlayerInfo;
	[Sport.NHL]: nhl.NhlPlayerInfo;
};
export type SportTeamStatsMap = {
	[Sport.EPL]: mlb.MlbTeamStats;
	[Sport.MLB]: mlb.MlbTeamStats;
	[Sport.NBA]: nba.NbaTeamStats;
	[Sport.NCAAF]: mlb.MlbTeamStats;
	[Sport.NFL]: nfl.NflTeamStats;
	[Sport.NHL]: nhl.NhlTeamStats;
};
export type SportPlayerStatsMap = {
	[Sport.EPL]: mlb.MlbPlayerStats;
	[Sport.MLB]: mlb.MlbPlayerStats;
	[Sport.NBA]: nba.NbaPlayerStats;
	[Sport.NCAAF]: mlb.MlbPlayerStats;
	[Sport.NFL]: nfl.NflPlayerStats;
	[Sport.NHL]: nhl.NhlPlayerStats;
};
