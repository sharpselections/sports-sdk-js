import {FantasyProsClient} from "../src";
import {allApiTests, Sport} from "@sports-sdk/core";

const nock = require("nock");

const testSeason = 2023;

describe("FantasyPros client live tests", () => {
    for (let sport of [Sport.NFL, Sport.NBA, Sport.MLB, Sport.NHL]) {
        const client = new FantasyProsClient(sport);
        const nockEndpoint = nock("https://api.fantasypros.com/v2/json");
        describe(sport, () => {
            allApiTests<FantasyProsClient<typeof sport>>({
                client,
                nockEndpoint,
                testCases: [
                    {
                        method: "getRankings" as keyof FantasyProsClient<typeof sport>,
                        liveTests: {passes: true},
                        params: {
                            season: testSeason
                        }
                    },
                ]
            })
        });
        if (sport !== Sport.MLB) {
            test("it can handle scoring parameter", async () => {
                const scoring = sport === Sport.NFL ? "PPR" : "ROTO";
                const rankings = await client.getRankings({
                    season: testSeason,
                    scoring,
                });
                expect(rankings.scoring).toBe(scoring);
            });
        }
        test("it can handle showing experts", async () => {
            const expert = sport === Sport.NFL || sport === Sport.MLB ? "7" : sport === Sport.NBA ? "23" : "9";
            const rankings = await client.getRankings({
                season: testSeason,
                showExperts: true
            });
            expect(rankings.expert_pub).toHaveProperty(expert);
            expect(rankings.expert_names).toHaveProperty(expert);
            expect(rankings.expert_twitter).toHaveProperty(expert);
            expect(rankings.players[0].experts).toHaveProperty(expert);
        });
        test("it can handle different rankings types", async () => {
            const rankingsType = sport === Sport.NHL ? "ADP" : "DK";
            const rankings = await client.getRankings({
                season: testSeason,
                rankingsType,
            });
            expect(rankings.type).toContain(sport === Sport.NHL ? rankingsType.toLowerCase() : "Dynasty");
            expect(rankings.ranking_type_name).toEqual(sport === Sport.NHL ? rankingsType.toLowerCase() : "dynasty");
        });
    }
})