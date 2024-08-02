import {FantasyNerdsClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";

const nock = require("nock");


describe("Fantasy Nerds client live tests", () => {
    const methodsMap = {
        "getDepthCharts": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getDraftProjections": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getDraftRankings": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getNews": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getSchedule": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getTeams": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getPlayers": [Sport.NFL, Sport.NBA, Sport.MLB],
        "getLineups": [Sport.NBA, Sport.MLB],
        "getPlayerRater": [Sport.NBA, Sport.MLB],
        "getAuctionValues": [Sport.NFL, Sport.MLB],
        "getWeatherForecasts": [Sport.NFL, Sport.MLB],
        "getAverageDraftPosition": [Sport.NFL],
        "getBestBallRankings": [Sport.NFL],
        "getByeWeeks": [Sport.NFL],
        "getDefensiveRanks": [Sport.NFL],
        "getFantasyLeaders": [Sport.NFL],
        "getInjuryReports": [Sport.NFL, Sport.NBA],
        "getNflPicks": [Sport.NFL],
        "getPlayoffProjections": [Sport.NFL],
        "getRestOfSeasonProjections": [Sport.NFL],
        "getWeeklyProjections": [Sport.NFL],
        "getWeeklyRankings": [Sport.NFL],

    };
    [Sport.NFL, Sport.NBA, Sport.MLB].map((value) => {
        const sport = value as Sport.NFL | Sport.NBA | Sport.MLB;
        describe(sport, () => {
            const client = new FantasyNerdsClient(sport, "TEST");
            const nockEndpoint = nock(`https://api.fantasynerds.com/v1/${sport.toLowerCase()}`);
            const testCases = Object.entries(methodsMap).filter(([_, sports]) => sports.includes(sport)).map(([method]) => ({
                method: method as keyof FantasyNerdsClient<typeof sport>
            })).map(({method}) => ({method, liveTests: {passes: true}}));
            allApiTests<FantasyNerdsClient<typeof sport>>({
                client,
                nockEndpoint,
                testCases
            });
        })
    });
});
