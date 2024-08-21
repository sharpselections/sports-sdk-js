import {PlayersResponse, RotowireClient} from "../src";
import {allApiTests, League} from "@sports-sdk/core";

const nock = require("nock");


describe("RotoWire client live tests", () => {
    const allLeagues = Object.keys(League) as Array<keyof typeof League>;
    const methodsMap = {
        "getNews": allLeagues,
        "getInjuries": allLeagues,
        "getLineups": [League.MLB, League.NBA, League.EPL]
    };
    allLeagues.map((value) => {
        const league = value as League;
        describe(league, () => {
            const client = new RotowireClient(league);
            const nockEndpoint = nock(`https://api.rotowire.com${RotowireClient.leagueMappings[league]}`);
            const testCases = Object.entries(methodsMap).filter(([_, sports]) => sports.includes(league)).map(([method]) => ({
                method: method as keyof RotowireClient<typeof league>
            })).map(({method}) => ({method, liveTests: {passes: true}}));
            allApiTests<RotowireClient<typeof league>>({
                client,
                nockEndpoint,
                testCases
            });
            test("Can successfully access parsed news data", async () => {
                const news = await client.getNews();
                console.log(news);
                if (news.Updates.length) {
                    const update1 = news.Updates[0];
                    expect(parseInt(update1.Priority)).toBeLessThanOrEqual(5);
                }
                expect(true).toBe(true);
            })
            // this endpoint returns a lot of data, increased timeout to give it time + not including it methodsMap testing
            test("Can successfully call & access players data", async () => {
                let playersFreeAgentsTeams = await client.getPlayers();
                console.log(playersFreeAgentsTeams);
                if (league === League.NCAAF) {
                    playersFreeAgentsTeams = playersFreeAgentsTeams as PlayersResponse<League.NCAAF>;
                    expect(playersFreeAgentsTeams[0].Link).toContain("rotowire.com")
                } else {
                    playersFreeAgentsTeams = playersFreeAgentsTeams as PlayersResponse<League.EPL>;
                    expect(playersFreeAgentsTeams.FreeAgents[0].Link).toContain("rotowire.com")
                    expect(playersFreeAgentsTeams.Teams[0].Players[0].Link).toContain("rotowire.com")
                }
            }, 120 * 1000)
        })
    });
});
