import {OpticOddsClient, OpticOddsSportsbooks} from "../src";
import {allApiTests, League} from "@sports-sdk/core";

const nock = require("nock");

jest.setTimeout(120 * 1000);

describe("OpticOdds client live tests", () => {
    const client = new OpticOddsClient();
    const nockEndpoint = nock("https://api.opticodds.com/api/v3");
    const testFixtureID = "0D2F2A3F3A3F";
    const testPlayerID = "5D770684D025";
    const redSoxID = "1232720C5D66";
    const yankeesID = "121EBAED4535";
    for (let sport of Object.values(League)) {
        describe(sport, () => {
            const opticLeague = OpticOddsClient.coreLeagueToOpticLeague(sport);
            describe("league specific", () => {
                allApiTests<OpticOddsClient>({
                    client,
                    nockEndpoint,
                    testCases: [
                        {
                            method: "getFixtures",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ]
                            }
                        },
                        {
                            method: "getFixtures",
                            liveTests: {passes: true},
                            params: {
                                active: true,
                                league: [
                                    opticLeague
                                ]
                            }
                        },
                        {
                            method: "getFutures",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ]
                            }
                        },
                        {
                            method: "getFuturesOdds",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ],
                                sportsbook: [
                                    OpticOddsSportsbooks.DraftKings
                                ]
                            }
                        },
                        {
                            method: "getInjuries",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ],
                            }
                        },
                        {
                            method: "getSportsbooks",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ],
                            }
                        },
                        {
                            method: "getSportsbooks",
                            liveTests: {passes: true},
                            params: {
                                active: true,
                                league: [
                                    opticLeague
                                ],
                            }
                        },
                        {
                            method: "getTeams",
                            liveTests: {passes: true},
                            params: {
                                league: [
                                    opticLeague
                                ],
                            }
                        },
                    ]
                })
            });
        });
    }
    describe("entity specific", () => {
        allApiTests<OpticOddsClient>({
            client,
            nockEndpoint,
            testCases: [
                {
                    method: "getOdds",
                    liveTests: {passes: true},
                    params: {
                        sportsbook: [
                            OpticOddsSportsbooks.DraftKings
                        ],
                        team_id: [
                            redSoxID
                        ]
                    }
                },
                {
                    method: "getFixturesPlayerResults",
                    liveTests: {passes: true},
                    params: {
                        fixture_id: [
                            testFixtureID
                        ]
                    }
                },
                {
                    method: "getPlayerResults",
                    liveTests: {passes: true},
                    params: {
                        player_id: [
                            testPlayerID
                        ]
                    }
                },
                {
                    method: "getFixtureResults",
                    liveTests: {passes: true},
                    params: {
                        fixture_id: [
                            testFixtureID
                        ]
                    }
                },
                {
                    method: "getH2HResults",
                    liveTests: {passes: true},
                    params: {
                        team1_id: redSoxID,
                        team2_id: yankeesID,
                    }
                },
                {
                    method: "getLeagues",
                    liveTests: {passes: true},
                    params: {
                        sport: [
                            "baseball"
                        ]
                    }
                },
                {
                    method: "getLeagues",
                    liveTests: {passes: true},
                    params: {
                        active: true,
                        sport: [
                            "baseball"
                        ]
                    }
                },
                {
                    method: "getMarkets",
                    liveTests: {passes: true},
                    params: {
                        sport: [
                            "baseball"
                        ]
                    }
                },
                {
                    method: "getPlayers",
                    liveTests: {passes: true},
                    params: {
                        sport: [
                            "baseball"
                        ]
                    }
                },
                {
                    method: "getSports",
                    liveTests: {passes: true},
                },
            ]
        })
    });
})