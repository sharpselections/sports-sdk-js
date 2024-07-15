import {RollingInsightsClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";

const nock = require("nock");

describe("Rolling Insights client live tests", () => {
    const client = new RollingInsightsClient();
    const nockEndpoint = nock("http://rest.datafeeds.rolling-insights.com/api/v1");
    for (const sport of Object.values(Sport)) {
        if (sport === Sport.EPL || sport === Sport.NCAAF){
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
                        path: `/schedule-season/now/${sport}`
                    },
                    {
                        method: "getWeeklySchedule" as keyof RollingInsightsClient,
                        path: `/schedule-week/now/${sport}`
                    },
                    {
                        method: "getDailySchedule" as keyof RollingInsightsClient,
                        path: `/schedule/now/${sport}`
                    },
                    {
                        method: "getLive" as keyof RollingInsightsClient,
                        path: `/live/now/${sport}`
                    },
                    {
                        method: "getTeamInfo" as keyof RollingInsightsClient,
                        path: `/team-info/${sport}`
                    },
                    {
                        method: "getTeamStats" as keyof RollingInsightsClient,
                        path: `/team-stats/${sport}`
                    },
                    {
                        method: "getPlayerInfo" as keyof RollingInsightsClient,
                        path: `/player-info/${sport}`
                    },
                    {
                        method: "getPlayerStats" as keyof RollingInsightsClient,
                        path: `/player-stats/${sport}`
                    },
                    {
                        method: "getPlayerInjuries" as keyof RollingInsightsClient,
                        path: `/injuries/${sport}`
                    },
                    {
                        method: "getTeamDepthChart" as keyof RollingInsightsClient,
                        path: `/depth-charts/${sport}`
                    },
                ].map(({method, path}) => ({method, path, query: true, params, liveTests: {passes: true}}))
            })
        })
    }
})