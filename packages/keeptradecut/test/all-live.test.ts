import {KeepTradeCutClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";

const nock = require("nock");


describe("KeepTradeCut client live tests", () => {
    const client = new KeepTradeCutClient();
    const nockEndpoint = nock(`https://keeptradecut.com`);
    allApiTests<KeepTradeCutClient>({
        client,
        nockEndpoint,
        testCases: [
            {
                method: "getPlayerRankings" as keyof KeepTradeCutClient
            },
            {
                method: "getDevyRankings" as keyof KeepTradeCutClient
            },
            {
                method: "getRookieRankings" as keyof KeepTradeCutClient
            },
            {
                method: "getPlayerHistory" as keyof KeepTradeCutClient
            },
        ].map(({method}) => ({method, liveTests: {passes: true}}))
    });
    test("Can successfully access parsed data", async () => {
        const playerRankings = await client.getPlayerRankings();
        const rank1Player = playerRankings[0];
        expect(rank1Player.isDevyReturningToSchool).toEqual(false);
        expect(rank1Player.isDevyYearDecrement).toEqual(false);
        // it defaults to returning sorted by superflex
        expect(rank1Player.superflexValues.rank).toEqual(1);
    })
});
