import {RotowireClient} from "../src";
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
            test("Can successfully access parsed data", async () => {
                const news = await client.getNews();
                console.log(news);
                const update1 = news.Updates[0];
                expect(parseInt(update1.Priority)).toBeLessThanOrEqual(5);
            })
        })
    });
});
