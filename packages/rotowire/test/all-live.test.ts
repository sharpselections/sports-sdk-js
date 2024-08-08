import {PlayersResponse, RotowireClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";

const nock = require("nock");


describe("RotoWire client live tests", () => {
    const allSports = Object.keys(Sport) as Array<keyof typeof Sport>;
    const methodsMap = {
        "getNews": allSports,
        "getInjuries": allSports,
        "getLineups": [Sport.MLB, Sport.NBA, Sport.EPL]
    };
    allSports.map((value) => {
        const sport = value as Sport;
        describe(sport, () => {
            const client = new RotowireClient(sport);
            const nockEndpoint = nock(`https://api.rotowire.com${RotowireClient.sportMappings[sport]}`);
            const testCases = Object.entries(methodsMap).filter(([_, sports]) => sports.includes(sport)).map(([method]) => ({
                method: method as keyof RotowireClient<typeof sport>
            })).map(({method}) => ({method, liveTests: {passes: true}}));
            allApiTests<RotowireClient<typeof sport>>({
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
                if (sport === Sport.NCAAF) {
                    playersFreeAgentsTeams = playersFreeAgentsTeams as PlayersResponse<Sport.NCAAF>;
                    expect(playersFreeAgentsTeams[0].Link).toContain("rotowire.com")
                } else {
                    playersFreeAgentsTeams = playersFreeAgentsTeams as PlayersResponse<Sport.EPL>;
                    expect(playersFreeAgentsTeams.FreeAgents[0].Link).toContain("rotowire.com")
                    expect(playersFreeAgentsTeams.Teams[0].Players[0].Link).toContain("rotowire.com")
                }
            }, 120 * 1000)
        })
    });
});
