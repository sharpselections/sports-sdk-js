import {RollingInsightsClient} from "../src";
import {allApiTests, League} from "@sports-sdk/core";

const nock = require("nock");

describe("Rolling Insights client live tests", () => {
    const client = new RollingInsightsClient();
    const nockEndpoint = nock("http://rest.datafeeds.rolling-insights.com/api/v1");
    for (const sport of Object.values(League)) {
        if (sport === League.EPL || sport === League.NCAAF){
            // EPL and NCAAF types aren't added yet
            continue;
        }
        describe(sport, () => {
            const params = {
                sport: sport
            }
            allApiTests<RollingInsightsClient>({
                client,
                nockEndpoint,
                testCases: [
                    {
                        method: "getSeasonSchedule" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getWeeklySchedule" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getDailySchedule" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getLive" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getTeamInfo" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getTeamStats" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getPlayerInfo" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getPlayerStats" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getPlayerInjuries" as keyof RollingInsightsClient,
                    },
                    {
                        method: "getTeamDepthChart" as keyof RollingInsightsClient,
                    },
                ].map(({method}) => ({method, params, liveTests: {passes: true}}))
            })
        })
    }
})