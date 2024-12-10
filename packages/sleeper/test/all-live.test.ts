import {SleeperClient, SleeperClientLeaguesList} from "../src";
import {allApiTests} from "@sports-sdk/testing";

const nock = require("nock");

describe("Sleeper client live tests", () => {
    for (let league of SleeperClientLeaguesList) {
        const client = new SleeperClient(league);
        const nockEndpoint = nock("https://api.sleeper.app/v1");
        describe(league, () => {
            // TODO add in personal league info for more complete integration tests
            allApiTests<SleeperClient<typeof league>>({
                client,
                nockEndpoint,
                testCases: [
                    {
                        method: "stateLookup" as keyof SleeperClient<typeof league>,
                    },
                ].map(({method}) => ({method, liveTests: {passes: true}}))
            })
        })
    }
})