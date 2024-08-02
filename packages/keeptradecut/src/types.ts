type Value = {
    value: number;
    rank: number;
    positionalRank: number;
    history: any[];
    overallTier: number;
    positionalTier: number;
}

type FantasyValues = Value & {
    startSitValue: number;
    overallTrend: number;
    positionalTrend: number;
    overall7DayTrend: number;
    positional7DayTrend: number;
    kept: number;
    traded: number;
    cut: number;
    diff: number;
    isOutThisWeek: boolean;
    tep: Value;
    tepp: Value;
    teppp: Value;
}

export interface PlayerData {
    playerName: string;
    playerID: number;
    slug: string;
    position: string;
    positionID: number;
    team: string;
    rookie: boolean;
    age: number;
    heightFeet: number;
    heightInches: number;
    weight: number;
    seasonsExperience: number;
    pickRound: number;
    pickNum: number;
    isFeatured: boolean;
    isStartSitFeatured: boolean;
    isTrending: boolean;
    isDevyReturningToSchool: boolean;
    isDevyYearDecrement: boolean;
    oneQBValues: FantasyValues;
    superflexValues: FantasyValues;
    number: number;
    teamLongName: string;
    birthday: string;
    draftYear: number;
    college: string;
    byeWeek: number;
    injury: { injuryCode: number };
}

type FantasyHistoryValue = {
    d: string;
    v: number;
}

type FantasyHistoryValues = {
    valueHistory: Array<FantasyHistoryValue>,
    tepHistory: Array<FantasyHistoryValue>,
    teppHistory: Array<FantasyHistoryValue>,
    tepppHistory: Array<FantasyHistoryValue>,
}

export interface PlayerHistory {
    playerID: number;
    oneQB: FantasyHistoryValues;
    superflex: FantasyHistoryValues;
}

export type PlayerPositions = "QB" | "WR" | "RB" | "TE";

export type Position = PlayerPositions & "RDP";

const examplePlayer: PlayerData = {
    playerName: "Patrick Mahomes",
    playerID: 272,
    slug: "patrick-mahomes-272",
    position: "QB",
    positionID: 1,
    team: "KCC",
    rookie: false,
    age: 28.9,
    heightFeet: 6,
    heightInches: 2,
    weight: 225,
    seasonsExperience: 7,
    pickRound: 1,
    pickNum: 10,
    isFeatured: false,
    isStartSitFeatured: false,
    isTrending: false,
    isDevyReturningToSchool: false,
    isDevyYearDecrement: false,
    oneQBValues: {
        startSitValue: 0,
        overallTrend: 0,
        positionalTrend: 1,
        overall7DayTrend: 2,
        positional7DayTrend: 1,
        kept: 19756,
        traded: 22066,
        cut: 18027,
        diff: 0,
        isOutThisWeek: false,
        tep: {value: 7724, rank: 15, positionalRank: 1, history: [], overallTier: 6, positionalTier: 1},
        tepp: {value: 7724, rank: 16, positionalRank: 1, history: [], overallTier: 5, positionalTier: 1},
        teppp: {value: 7724, rank: 19, positionalRank: 1, history: [], overallTier: 5, positionalTier: 1},
        value: 7724,
        rank: 14,
        positionalRank: 1,
        history: [],
        overallTier: 5,
        positionalTier: 1,
    },
    superflexValues: {
        startSitValue: 0,
        overallTrend: 0,
        positionalTrend: 0,
        overall7DayTrend: 0,
        positional7DayTrend: 0,
        kept: 135487,
        traded: 23560,
        cut: 49478,
        diff: 0,
        isOutThisWeek: false,
        tep: {value: 9998, rank: 1, positionalRank: 1, history: [], overallTier: 1, positionalTier: 1},
        tepp: {value: 9998, rank: 1, positionalRank: 1, history: [], overallTier: 1, positionalTier: 1},
        teppp: {value: 9998, rank: 1, positionalRank: 1, history: [], overallTier: 1, positionalTier: 1},
        value: 9998,
        rank: 1,
        positionalRank: 1,
        history: [],
        overallTier: 1,
        positionalTier: 1,
    },
    number: 15,
    teamLongName: "Kansas City Chiefs",
    birthday: "811314000",
    draftYear: 2017,
    college: "Texas Tech",
    byeWeek: 6,
    injury: {injuryCode: 1},
};
