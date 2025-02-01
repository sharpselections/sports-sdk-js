import {RUWTClient, RUWTSport} from "../src";
// @ts-ignore
import {allApiTests} from "@sports-sdk/testing";
import {
    GAMES_RESPONSE,
    ODDS_RESPONSE,
    ODDS_SPLITS_RESPONSE,
    PLAYER_STATS_RESPONSE,
    PLAYERS_RESPONSE,
    SIDE_ODDS_RESPONSE,
    SPORTS_RESPONSE,
    STANDINGS_RESPONSE,
    TEAMS_RESPONSE
} from "./responses";

const nock = require("nock");

const devers = 64677;


describe("Are You Watching This?! client tests", () => {
    const client = new RUWTClient();
    const nockEndpoint = nock(`https://sharpselections.api.areyouwatchingthis.com/api`);
    allApiTests<RUWTClient>({
        client,
        nockEndpoint,
        testCases: [
            {
                method: "getGames",
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta"
                    ],
                },
                nockTests: {
                    path: "/games.json",
                    query: true,
                    expectedResponse: GAMES_RESPONSE
                }
            },
            {
                method: "getGameOdds",
                params: {
                    sport: "mlb"
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta"
                    ],
                },
                nockTests: {
                    path: "/odds.json",
                    query: true,
                    expectedResponse: ODDS_RESPONSE
                }
            },
            {
                method: "getSideOdds",
                params: {
                    q: "mlb/rafael_devers"
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                        "players",
                    ],
                },
                nockTests: {
                    path: "/sideodds.json",
                    query: true,
                    expectedResponse: SIDE_ODDS_RESPONSE
                }
            },
            {
                method: "getPlayers",
                params: {
                    playerID: devers
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/players.json",
                    query: true,
                    expectedResponse: PLAYERS_RESPONSE
                }
            },
            {
                method: "getPlayerStatistics",
                params: {
                    playerID: devers
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/statistics.json",
                    query: true,
                    expectedResponse: PLAYER_STATS_RESPONSE
                }
            },
            {
                method: "getSports",
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/sports.json",
                    query: true,
                    expectedResponse: SPORTS_RESPONSE
                }
            },
            {
                method: "getStandings",
                params: {
                    sport: "mlb"
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/standings.json",
                    query: true,
                    expectedResponse: STANDINGS_RESPONSE
                }
            },
            {
                method: "getTeams",
                params: {
                    sport: "nba"
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/teams.json",
                    query: true,
                    expectedResponse: TEAMS_RESPONSE
                }
            },
            {
                method: "getOddsSplits",
                params: {
                    sport: "mlb"
                },
                liveTests: {
                    passes: true,
                    properties: [
                        "results",
                        "meta",
                    ],
                },
                nockTests: {
                    path: "/odds-splits.json",
                    query: true,
                    expectedResponse: ODDS_SPLITS_RESPONSE
                }
            },
        ]
    });
    test("can access player stats", async () => {
        const devers2023 = await client.getPlayerStatistics({
            playerID: devers,
            season: 2023
        });
        const stats = devers2023?.results?.[0]?.statistics;
        expect(stats?.BASEBALL_BATTING_HOME_RUNS).toEqual(33);
    });
    test("can access game stats", async () => {
        const superBowlLI = await client.getGames({
            gameID: 370354
        });
        const team1Stats = superBowlLI?.results?.[0]?.statistics?.team1;
        expect(team1Stats?.FOOTBALL_PASSING_TOUCHDOWNS?.[0].value).toEqual(2);
    });
    test("can get basketball injuries", async () => {
        const injuries = await client.getInjuries({
            sport: RUWTSport.nba
        });
        expect(injuries).toBeDefined();
        console.log(injuries);
    })
});
