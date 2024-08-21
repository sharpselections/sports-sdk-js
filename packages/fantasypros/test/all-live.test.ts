import {FantasyProsClient} from "../src";
import {allApiTests, League} from "@sports-sdk/core";

const nock = require("nock");

const testSeason = 2023;

describe("FantasyPros client live tests", () => {
    for (let sport of [League.NFL, League.NBA, League.MLB, League.NHL]) {
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
        if (sport !== League.MLB) {
            test("it can handle scoring parameter", async () => {
                const scoring = sport === League.NFL ? "PPR" : "ROTO";
                const rankings = await client.getRankings({
                    season: testSeason,
                    scoring,
                });
                expect(rankings.scoring).toBe(scoring);
            });
        }
        test("it can handle showing experts", async () => {
            const expert = sport === League.NFL || sport === League.MLB ? "7" : sport === League.NBA ? "23" : "9";
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
            const rankingsType = sport === League.NHL ? "ADP" : "DK";
            const rankings = await client.getRankings({
                season: testSeason,
                rankingsType,
            });
            expect(rankings.type).toContain(sport === League.NHL ? rankingsType.toLowerCase() : "Dynasty");
            expect(rankings.ranking_type_name).toEqual(sport === League.NHL ? rankingsType.toLowerCase() : "dynasty");
        });
    }
})