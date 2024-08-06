import {SleeperClient, SleeperClientSportsList} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("Sleeper client live tests", () => {
    for (let sport of SleeperClientSportsList) {
        const client = new SleeperClient(sport);
        const nockEndpoint = nock("https://api.sleeper.app/v1");
        describe(sport, () => {
            // TODO add in personal league info for more complete integration tests
            allApiTests<SleeperClient<typeof sport>>({
                client,
                nockEndpoint,
                testCases: [
                    {
                        method: "stateLookup" as keyof SleeperClient<typeof sport>,
                    },
                ].map(({method}) => ({method, liveTests: {passes: true}}))
            })
        })
    }
})