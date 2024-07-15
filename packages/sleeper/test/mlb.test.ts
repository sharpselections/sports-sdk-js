import {MLBRotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("MLB Rotowire Client", () => {
    allApiTests<MLBRotowireClient>({
        client: new MLBRotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Baseball/MLB"),
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
                        "Date": "2017-10-31",
                        "Updates": [
                            {
                                "Id": 640905,
                                "DateTime": "2017-10-31T11:37:43-07:00",
                                "Priority": 4,
                                "Headline": "Re-signs with Brewers",
                                "IsTransaction": 0,
                                "Notes": "Ortega signed a minor-league deal with Milwaukee on Tuesday.",
                                "Analysis": "Ortega missed all of 2017 while recovering from Tommy John surgery, but has been pitching in the Arizona Fall League, allowing five runs over three innings pitched thus far. This is the first action he's seen since going under the knife. Ortega spent his 2016 season at Double-A Biloxi, posting an uncharacteristic 4.99 ERA over 97.1 innings prior to his injury. He'll look to finish his rehab this winter, and likely start next season at Double-A.",
                                "Player": {
                                    "Id": 13803,
                                    "FirstName": "Jorge",
                                    "LastName": "Ortega",
                                    "Position": "P",
                                    "Link": "https:\/\/www.rotowire.com\/baseball\/player.htm?id=13803",
                                    "LeagueLevel": "AA",
                                    "Injury": {
                                        "Status": "NO",
                                        "Type": "Elbow",
                                        "ReturnDate": "2018-02-01",
                                        "Detail": "Plantar Fasciitis",
                                        "Side": "Not Specified"
                                    }
                                },
                                "Team": {
                                    "Id": 15,
                                    "Code": "MIL",
                                    "Name": "Milwaukee Brewers",
                                    "Nickname": "Brewers"
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
                        "Players": [
                            {
                                "Id": 6827,
                                "OnDisabledList": 1,
                                "FirstName": "Victor",
                                "LastName": "Martinez",
                                "Position": "DH",
                                "Injury": {
                                    "Type": "Chest",
                                    "Status": "Out",
                                    "ReturnDate": "2018-03-01",
                                    "Detail": "Surgery",
                                    "Side": "Left"
                                },
                                "Team": {
                                    "Id": 7,
                                    "Code": "CIN"
                                },
                                "InjuryType": "Chest",
                                "InjuryStatus": "Out",
                                "ReturnDate": "2018-03-01",
                                "InjuryDetail": "Surgery",
                                "InjurySide": "Left"
                            }
                        ]
                    },
                }
            },
            {
                method: "getLineups",
                path: "/ExpectedLineups.php",
                query: true,
                liveTests: {
                    properties: ['Games'],
                },
                nockTests: {
                    expectedResponse: {
                        "Date": "2019-06-15",
                        "Games": [
                            {
                                "DateTime": "2019-06-15T13:10:00-04:00",
                                "Teams": [
                                    {
                                        "Id": 1,
                                        "Code": "ANA",
                                        "IsHome": 1,
                                        "LineupStatus": "C",
                                        "Players": [
                                            {
                                                "Id": 12257,
                                                "FirstName": "Kole",
                                                "LastName": "Calhoun",
                                                "Position": "RF",
                                                "BattingSpot": 1,
                                                "Link": "https:\/\/www.rotowire.com\/baseball\/player.htm?id=12257"
                                            }
                                        ]
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