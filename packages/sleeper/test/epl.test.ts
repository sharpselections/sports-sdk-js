import {EPLRotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("EPL Rotowire Client", () => {
    allApiTests<EPLRotowireClient>({
        client: new EPLRotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Soccer/EPL"),
        testCases: [
            {
                method: "getNews",
                path: "/News.php",
                query: true,
                liveTests: {
                    properties: ['Date', 'Updates'],
                },
                nockTests: {
                    expectedResponse: {
                        "Date": "2018-04-13",
                        "Updates": [
                            {
                                "Id": 103209,
                                "DateTime": "2018-04-13 06:27:47.210",
                                "Priority": 1,
                                "Headline": "Will miss Tottenham match",
                                "Notes": "Aguero (knee) will miss Saturday's match with Tottenham.",
                                "Analysis": "Aguero aggravated a knee injury in last weekend's 3-2 loss to Manchester United during a tackle by Ashley Young. He'll now be sidelined against Spurs despite featuring as a substitute in Tuesday's 2-1 Champions League loss to Liverpool. Gabriel Jesus is expected to start up front in place of Aguero, while Leroy Sane and Raheem Sterling should feature on the wings.",
                                "Player": {
                                    "Id": 2204,
                                    "FirstName": "Sergio",
                                    "LastName": "Aguero",
                                    "Position": "F",
                                    "Link": "https:\/\/www.rotowire.com\/soccer\/player.htm?id=2204"
                                },
                                "Team": {
                                    "Id": 10,
                                    "Name": "Manchester City"
                                }
                            }
                        ]
                    },
                }
            },
            {
                method: "getInjuries",
                path: "/Injuries.php",
                query: true,
                liveTests: {
                    properties: ['Players'],
                },
                nockTests: {
                    expectedResponse: {
                        "League": "EPL",
                        "Players": [
                            {
                                "Id": 16494,
                                "Firstname": "Charlie",
                                "Lastname": "Adam",
                                "Position": "M",
                                "Injury": {
                                    "Type": "Suspension",
                                    "Status": "SUS",
                                    "ReturnDate": "2018-04-16"
                                }
                            }
                        ]
                    },
                }
            },
            {
                method: "getLineups",
                path: "/Lineups.php",
                query: true,
                liveTests: {
                    properties: ['Games', 'Season', 'Week'],
                },
                nockTests: {
                    expectedResponse: {
                        "Season": 2020,
                        "Week": 1,
                        "Games": [
                            {
                                "Date": "2017-08-12T12:30:00-04:00",
                                "Id": 19011,
                                "Teams": [
                                    {
                                        "Name": "Brighton & Hove Albion",
                                        "LineupStatus": "C",
                                        "Players": [
                                            {
                                                "Id": 24514,
                                                "Firstname": "Dale",
                                                "Lastname": "Stephens",
                                                "Position": "M"
                                            }
                                        ],
                                        "Id": 2
                                    }
                                ]
                            }
                        ]
                    },
                }
            },
        ]
    });
});