import {NBARotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("NBA Rotowire Client", () => {
    allApiTests<NBARotowireClient>({
        client: new NBARotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Basketball/NBA"),
        testCases: [
            {
                method: "getNews",
                path: "/News.php",
                query: true,
                properties: ['Date', 'Updates'],
                expectedResponse: {
                    "League": "NBA",
                    "Date": "2017-11-14",
                    "Updates": [
                        {
                            "Id": 269752,
                            "DateTime": "2017-11-14T00:06:44-08:00",
                            "Priority": 3,
                            "Headline": "Sees 21 minutes in Monday's win",
                            "Notes": "Liggins collected six points (2-4 FG, 2-3 3Pt) and three steals in 21 minutes during Monday's 110-103 win over the Grizzlies.",
                            "Analysis": "Liggins matched season highs in scoring and minutes while setting season highs in steals and threes. He has appeared in 10 of 13 games in 2017-18, including seven straight, and if Liggins continues to play solid defense and hit some treys he could eventually earn a more consistent and reliable role off the bench.",
                            "Injury": {
                                "Status": "OUT",
                                "Type": "Ribs",
                                "Location": null,
                                "Detail": "Bruise",
                                "Side": "Not Specified",
                                "ReturnDate": "2017-11-17"
                            },
                            "Player": {
                                "Id": 3243,
                                "FirstName": "DeAndre",
                                "LastName": "Liggins",
                                "Position": "G         ",
                                "InjuryStatus": "OUT",
                                "Link": "https:\/\/www.rotowire.com\/basketball\/player.htm?id=3243"
                            },
                            "Team": {
                                "Id": 13,
                                "Code": "MIL",
                                "Name": "Milwaukee Bucks",
                                "Nickname": "Bucks"
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
                            "Id": 1891,
                            "FirstName": "Vince",
                            "LastName": "Carter",
                            "Position": "G         ",
                            "InjuryStatus": "OUT",
                            "Injury": {
                                "Status": "OUT",
                                "Type": "Illness",
                                "Location": "Head",
                                "Detail": "Sprain",
                                "Side": "Right",
                                "ReturnDate": "2017-11-15"
                            }
                        }
                    ]
                },
            },
            {
                method: "getLineups",
                path: "/Lineups.php",
                query: true,
                properties: ['Games'],
                expectedResponse: {
                    "Date": "2017-11-14",
                    "Games": [
                        {
                            "Id": 24076,
                            "DateTime": "2017-11-14T19:30:00-05:00",
                            "Teams": [
                                {
                                    "Id": 2,
                                    "Code": "BOS",
                                    "Status": "X",
                                    "IsHome": 1,
                                    "Name": "Boston Celtics",
                                    "Nickname": "Celtics",
                                    "Players": [
                                        {
                                            "Id": 3427,
                                            "FirstName": "Aron",
                                            "LastName": "Baynes",
                                            "Position": "C"
                                        }
                                    ],
                                    "Bench": [
                                        {
                                            "Id": 4813,
                                            "FirstName": "Jarrett",
                                            "LastName": "Culver",
                                            "Position": "B"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            },
        ]
    });
});