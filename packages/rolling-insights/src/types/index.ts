import {Sport} from "@sports-sdk/core";
import * as nba from "./nba";
import * as nhl from "./nhl";
import * as nfl from "./nfl";
import * as mlb from "./mlb";

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
	[Sport.NBA]: nba.NbaSchedule;
	[Sport.NHL]: nhl.NhlSchedule;
	[Sport.NFL]: nfl.NflSchedule;
	[Sport.MLB]: mlb.MlbSchedule;
	[Sport.EPL]: mlb.MlbSchedule;
	[Sport.NCAAF]: mlb.MlbSchedule;
};

export type SportTeamInfoMap = {
	[Sport.NBA]: nba.NbaTeamInfo;
	[Sport.NHL]: nhl.NhlTeamInfo;
	[Sport.NFL]: nfl.NflTeamInfo;
	[Sport.MLB]: mlb.MlbTeamInfo;
	[Sport.EPL]: mlb.MlbTeamInfo;
	[Sport.NCAAF]: mlb.MlbTeamInfo;
};
export type SportPlayerInfoMap = {
	[Sport.NBA]: nba.NbaPlayerInfo;
	[Sport.NHL]: nhl.NhlPlayerInfo;
	[Sport.NFL]: nfl.NflPlayerInfo;
	[Sport.MLB]: mlb.MlbPlayerInfo;
	[Sport.EPL]: mlb.MlbPlayerInfo;
	[Sport.NCAAF]: mlb.MlbPlayerInfo;
};
export type SportTeamStatsMap = {
	[Sport.NBA]: nba.NbaTeamStats;
	[Sport.NHL]: nhl.NhlTeamStats;
	[Sport.NFL]: nfl.NflTeamStats;
	[Sport.MLB]: mlb.MlbTeamStats;
	[Sport.EPL]: mlb.MlbTeamStats;
	[Sport.NCAAF]: mlb.MlbTeamStats;
};
export type SportPlayerStatsMap = {
	[Sport.NBA]: nba.NbaPlayerStats;
	[Sport.NHL]: nhl.NhlPlayerStats;
	[Sport.NFL]: nfl.NflPlayerStats;
	[Sport.MLB]: mlb.MlbPlayerStats;
	[Sport.EPL]: mlb.MlbPlayerStats;
	[Sport.NCAAF]: mlb.MlbPlayerStats;
};
