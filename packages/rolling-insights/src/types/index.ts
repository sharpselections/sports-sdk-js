import * as nba from "./nba";
import * as nhl from "./nhl";
import * as nfl from "./nfl";
import * as mlb from "./mlb";
import * as ncaaf from "./ncaaf";
import * as ncaam from "./ncaam";
import {League} from "@sports-sdk/core";

export type {MlbTeamInfo, MlbPlayerInfo, MlbPlayerStats, MlbSchedule, MlbTeamStats} from "./mlb";
export {
    MlbTeamInfoSchema, MlbTeamStatsSchema, MlbPlayerStatsSchema, MlbPlayerInfoSchema, MlbScheduleSchema,
} from "./mlb";
export type {NbaPlayerInfo, NbaTeamInfo, NbaSchedule, NbaPlayerStats, NbaTeamStats} from "./nba";
export {
    NbaPlayerInfoSchema, NbaPlayerStatsSchema, NbaScheduleSchema, NbaTeamInfoSchema, NbaTeamStatsSchema,
} from "./nba";
export type {NflPlayerInfo, NflPlayerStats, NflSchedule, NflTeamInfo, NflTeamStats} from "./nfl";
export {
    NflScheduleSchema, NflTeamInfoSchema, NflTeamStatsSchema, NflPlayerInfoSchema, NflPlayerStatsSchema,
} from "./nfl";
export type {NhlPlayerInfo, NhlPlayerStats, NhlSchedule, NhlTeamInfo, NhlTeamStats} from "./nhl";
export {
    NhlTeamInfoSchema, NhlTeamStatsSchema, NhlPlayerStatsSchema, NhlPlayerInfoSchema, NhlScheduleSchema,
} from "./nhl";
export type {NcaafPlayerInfo, NcaafTeamInfo} from "./ncaaf"
export {NcaafPlayerInfoSchema, NcaafTeamInfoSchema} from "./ncaaf"
export type {NcaamPlayerInfo, NcaamTeamInfo} from "./ncaam"
export {NcaamPlayerInfoSchema, NcaamTeamInfoSchema} from "./ncaam"

export type LeagueScheduleMap = {
    [League.EPL]: mlb.MlbSchedule;
    [League.MLB]: mlb.MlbSchedule;
    [League.NBA]: nba.NbaSchedule;
    [League.NCAAF]: mlb.MlbSchedule;
    [League.NFL]: nfl.NflSchedule;
    [League.NHL]: nhl.NhlSchedule;
    [League.NCAAM]: mlb.MlbSchedule;
};

export type LeagueTeamInfoMap = {
    [League.EPL]: mlb.MlbTeamInfo;
    [League.MLB]: mlb.MlbTeamInfo;
    [League.NBA]: nba.NbaTeamInfo;
    [League.NCAAF]: ncaaf.NcaafTeamInfo;
    [League.NFL]: nfl.NflTeamInfo;
    [League.NHL]: nhl.NhlTeamInfo;
    [League.NCAAM]: ncaam.NcaamTeamInfo;
};
export type LeaguePlayerInfoMap = {
    [League.EPL]: mlb.MlbPlayerInfo;
    [League.MLB]: mlb.MlbPlayerInfo;
    [League.NBA]: nba.NbaPlayerInfo;
    [League.NCAAF]: ncaaf.NcaafPlayerInfo;
    [League.NFL]: nfl.NflPlayerInfo;
    [League.NHL]: nhl.NhlPlayerInfo;
    [League.NCAAM]: ncaam.NcaamPlayerInfo;
};
export type LeagueTeamStatsMap = {
    [League.EPL]: mlb.MlbTeamStats;
    [League.MLB]: mlb.MlbTeamStats;
    [League.NBA]: nba.NbaTeamStats;
    [League.NCAAF]: mlb.MlbTeamStats;
    [League.NFL]: nfl.NflTeamStats;
    [League.NHL]: nhl.NhlTeamStats;
    [League.NCAAM]: mlb.MlbTeamStats;
};
export type LeaguePlayerStatsMap = {
    [League.EPL]: mlb.MlbPlayerStats;
    [League.MLB]: mlb.MlbPlayerStats;
    [League.NBA]: nba.NbaPlayerStats;
    [League.NCAAF]: mlb.MlbPlayerStats;
    [League.NFL]: nfl.NflPlayerStats;
    [League.NHL]: nhl.NhlPlayerStats;
    [League.NCAAM]: mlb.MlbPlayerStats;
};
