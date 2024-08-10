import {RUWTClient} from "../src";
import {allApiTests} from "@sports-sdk/core";
import {
    GAMES_RESPONSE,
    ODDS_RESPONSE,
    PLAYER_STATS_RESPONSE,
    PLAYERS_RESPONSE,
    SIDE_ODDS_RESPONSE,
    SPORTS_RESPONSE, STANDINGS_RESPONSE, TEAMS_RESPONSE
} from "./responses";

const nock = require("nock");


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
                        "games",
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
                    playerID: 64677
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
                    playerID: 64677
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
        ]
    });
});
