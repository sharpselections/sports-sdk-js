import {OddsBlazeClient, OddsBlazeLeague, OddsBlazeSGPSportsbooks} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

jest.setTimeout(120 * 1000);

describe("OddsBlaze client live tests", () => {
    const client = new OddsBlazeClient();
    const nockEndpoint = nock("https://example.com");
    allApiTests<OddsBlazeClient>({
        client,
        nockEndpoint,
        sleep: 2000,
        testCases: [
            {
                method: "getOdds",
                liveTests: {passes: true},
                params: {
                    league: OddsBlazeLeague.MLB,
                    sportsbook: OddsBlazeSGPSportsbooks.DRAFTKINGS,
                }

            },
            {
                method: "settleBets",
                liveTests: {passes: true},
                params: {
                    gradeIds: [
                        "dExxL0hhVUZ3aDJtNnVHQU9GL1JoVE9za1JpSWxXcTBvTEZGVUZPbFVGTE96MlZ6akErYnhmbUUrWWJSeUZ0eU50dmJiVDVhRFo0M3U5SU5LN0xiTFlocG81QUx5WVhXRFVGZ2c1dWNIbGM9",
                        "dExxL0hhVUZ3aDJtNnVHQU9GL1JoU2NZcnRhM2JqWmFvTXIzUGJsalBBa0I0YXoxM29QRnlnU2dNWG9Ga2xiS1VlZXhYdm1QS24zanNZYi9IbzZXQzZ3MW1ta3NhNmFibHR5Vm90OUFEVlk9"
                    ]
                }
            },
            {
                method: "priceSameGameParlay",
                liveTests: {passes: true},
                params: {
                    price: "decimal",
                    sportsbook: OddsBlazeSGPSportsbooks.DRAFTKINGS,
                    sgpIds: [
                        "bWhoT1hKUTlIRG4xTlRQbmhEZ3ZJaHdIZHhITnlwZVBLby8wb0xocnZuUFNPMFJwZ1V2MGk0NDI4SGNxK05FUg",
                        "MkhPRGgxRXFsd25jZ0dVZ3diTmoyUGRRblBEL0ordGNVaFlpZ1hWTDkreWJEL1Z0YXQ0TDN1UDUvTFp2a1NxQw",
                    ]
                }
            },
            {
                method: "getSportsbooks",
                liveTests: {passes: true},
            },
            {
                method: "getMarkets",
                liveTests: {passes: true},
                params: {
                    league: OddsBlazeLeague.MLB
                }
            },
            {
                method: "getTeams",
                liveTests: {passes: true},
            },
            {
                method: "getPlayers",
                liveTests: {passes: true},
                params: {
                    league: OddsBlazeLeague.MLB
                }
            },
        ]
    })
})