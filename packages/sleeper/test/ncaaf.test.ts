import {NCAAFRotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("NCAAF Rotowire Client", () => {
    allApiTests<NCAAFRotowireClient>({
        client: new NCAAFRotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Football/CFB"),
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
                        "Date": "2018-03-05",
                        "Updates": [
                            {
                                "Id": 120649,
                                "DateTime": "2018-03-05 20:14:20.283",
                                "Priority": 3,
                                "Headline": "Set to compete for starting role",
                                "Notes": "Oladokun will compete for the No. 1 quarterback role during spring practices, Joey Knight of the Tampa Bay Times reports.",
                                "Analysis": "The quarterback position appears to be up for grabs heading into the spring, as both Oladokun and Brett Kean were spotted taking reps with the first-team offense. Neither player has seen much action at the collegiate level.",
                                "Injury": {
                                    "Status": "QUESTIONABLE",
                                    "Type": "Undisclosed",
                                    "Location": null,
                                    "Detail": "Soreness",
                                    "Side": "Not Specified"
                                },
                                "Player": {
                                    "Id": 21675,
                                    "FirstName": "Chris",
                                    "LastName": "Oladokun",
                                    "Position": "QB",
                                    "Link": "https:\/\/www.rotowire.com\/cfootball\/player.htm?id=19678"
                                },
                                "Team": {
                                    "Id": "South Florida",
                                    "Name": "South Florida",
                                    "Nickname": "Bulls "
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
                                "Id": 20441,
                                "FirstName": "David",
                                "LastName": "Ajamu",
                                "Position": "TE",
                                "Injury": {
                                    "Type": "Leg",
                                    "Status": "QUESTIONABLE",
                                    "Detail": "Not Specified",
                                    "Side": "Not Specified",
                                    "ReturnDate": "2019-08-01"
                                }
                            }
                        ]
                    },
                }
            }
        ]
    });
});