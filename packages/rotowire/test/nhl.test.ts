import {NHLRotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("NHL Rotowire Client", () => {
    allApiTests<NHLRotowireClient>({
        client: new NHLRotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Hockey/NHL"),
        testCases: [
            {
                method: "getNews",
                path: "/News.php",
                query: true,
                properties: ['Date', 'Updates'],
                expectedResponse: {
                    "Date": "2018-04-05",
                    "Updates": [
                        {
                            "Id": 359539,
                            "DateTime": "2018-04-05 00:01:37.510",
                            "Priority": 3,
                            "Headline": "Scores lone goal against Ducks",
                            "Notes": "Dumba notched his team's only goal Wednesday in a 3-1 loss to Anaheim.",
                            "Analysis": "Dumba has increased his scoring without losing his abilities on defense, as his plus-15 rating ties a career high and his 41 penalty minutes are in line with his average totals. He's become a solid all-around defenseman and should continue to provide strong value.",
                            "Player": {
                                "Id": 3973,
                                "FirstName": "Mathew",
                                "LastName": "Dumba",
                                "Position": "D",
                                "Link": "https:\/\/www.rotowire.com\/hockey\/player.htm?id=3973",
                                "Injury": {
                                    "Status": "OUT",
                                    "Type": "Shoulder"
                                }
                            },
                            "Team": {
                                "Id": 14,
                                "Code": "MIN"
                            }
                        }
                    ]
                },
            },
            {
                method: "getInjuries",
                path: "/Injuries.php",
                query: true,
                properties: ['Players'],
                expectedResponse: {
                    "Players": [
                        {
                            "Id": 344,
                            "Injury": {
                                "Type": "Illness",
                                "Status": "DL",
                                "ReturnDate": "2018-09-01"
                            },
                            "FirstName": "Marian",
                            "LastName": "Hossa",
                            "Team": {
                                "Id": 32,
                                "Code": "LAS"
                            },
                            "Position": "RW"
                        }
                    ]
                },
            }
        ]
    });
});