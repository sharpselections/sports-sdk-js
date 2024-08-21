import {FantasyNerdsClient} from "../src";
import {allApiTests, League} from "@sports-sdk/core";

const nock = require("nock");


describe("Fantasy Nerds client live tests", () => {
    const methodsMap = {
        "getDepthCharts": [League.NFL, League.NBA, League.MLB],
        "getDraftProjections": [League.NFL, League.NBA, League.MLB],
        "getDraftRankings": [League.NFL, League.NBA, League.MLB],
        "getNews": [League.NFL, League.NBA, League.MLB],
        "getSchedule": [League.NFL, League.NBA, League.MLB],
        "getTeams": [League.NFL, League.NBA, League.MLB],
        "getPlayers": [League.NFL, League.NBA, League.MLB],
        "getLineups": [League.NBA, League.MLB],
        "getPlayerRater": [League.NBA, League.MLB],
        "getAuctionValues": [League.NFL, League.MLB],
        "getWeatherForecasts": [League.NFL, League.MLB],
        "getAverageDraftPosition": [League.NFL],
        "getBestBallRankings": [League.NFL],
        "getByeWeeks": [League.NFL],
        "getDefensiveRanks": [League.NFL],
        "getDynastyRankings": [League.NFL],
        "getFantasyLeaders": [League.NFL],
        "getInjuryReports": [League.NFL, League.NBA],
        "getNflPicks": [League.NFL],
        "getPlayoffProjections": [League.NFL],
        "getRestOfSeasonProjections": [League.NFL],
        "getWeeklyProjections": [League.NFL],
        "getWeeklyRankings": [League.NFL],

    };
    [League.NFL, League.NBA, League.MLB].map((value) => {
        const sport = value as League.NFL | League.NBA | League.MLB;
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
            test("Can successfully access parsed data", async () => {
                const playerRankings = await client.getDraftRankings();
                console.log(playerRankings);
                const rank1Player = playerRankings.players[0];
                expect(rank1Player.rank).toEqual(1);
                expect(rank1Player.rank_position).toEqual(1);
            })
        })
    });
});
