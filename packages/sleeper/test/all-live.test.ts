import {SleeperClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";
const nock = require("nock");

describe("Sleeper client live tests", () => {
    const client = new SleeperClient();
    const nockEndpoint = nock("https://api.sleeper.app/v1");
    for (const sport of [Sport.NBA, Sport.NFL]) {
        describe(sport, () => {
            const params = {
                sport: sport
            }
            // TODO add in personal league info for more complete integration tests
            allApiTests<SleeperClient>({
                client,
                nockEndpoint,
                testCases: [
                    {
                        method: "stateLookup" as keyof SleeperClient,
                    },
                ].map(({method}) => ({method, params, liveTests: {passes: true}}))
            })
        })
    }
})