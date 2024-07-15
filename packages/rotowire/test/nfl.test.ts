import {NFLRotowireClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("NFL Rotowire Client", () => {
    allApiTests<NFLRotowireClient>({
        client: new NFLRotowireClient(),
        nockEndpoint: nock("https://api.rotowire.com/Football/NFL"),
        testCases: [
            {
                method: "getNews",
                liveTests: {
                    properties: ['Date', 'Updates'],
                },
                nockTests: {
                    path: "/News.php",
                    query: true,
                    expectedResponse: {
                        "League": "NFL",
                        "Date": "2018-04-12",
                        "Updates": [
                            {
                                "Id": 421450,
                                "DateTime": "2018-04-12T13:10:45-07:00",
                                "Priority": 3,
                                "Headline": "Four-game suspension confirmed",
                                "IsTransaction": 1,
                                "Notes": "The NFL made Burfict's four-game suspension official for a violation of the policy on performance-enhancing substances, Paul Dehner Jr. of The Cincinnati Enquirer reports.",
                                "Analysis": "The ban had been lingering on the fringes for nearly one month, but the league confirmed Burfict will miss the first four games of the 2018 campaign only days before the start of the Bengals' offseason program. He'll be able to take part on those workouts and all practices and games during training camp and the preseason. That being said, the tackle maven won't take the field until at least Week 5 of the regular season, depending upon where the team's bye lands. Expect Jordan Evans and Carl Lawson to fill in the gap at weak-side linebacker during Burfict's absence.",
                                "Injury": {
                                    "Status": "OUT",
                                    "Type": "Suspension",
                                    "Detail": "Not Specified",
                                    "Location": "Other",
                                    "Side": "Not Specified"
                                },
                                "Player": {
                                    "Id": 12245,
                                    "FirstName": "Vontaze",
                                    "LastName": "Burfict",
                                    "Position": "LB",
                                    "Link": "https:\/\/www.rotowire.com\/football\/player.htm?id=8522"
                                },
                                "Team": {
                                    "Id": 7,
                                    "Code": "CIN"
                                }
                            }
                        ]
                    },
                }
            },
            {
                method: "getInjuries",
                liveTests: {
                    properties: ['Players'],
                },
                nockTests: {
                    path: "/Injuries.php",
                    query: true,
                    expectedResponse: {
                        "Players": [
                            {
                                "Id": 2513,
                                "FirstName": "Josh",
                                "LastName": "McCown",
                                "Position": "QB",
                                "Injury": {
                                    "Status": "QUESTIONABLE",
                                    "Type": "Hand",
                                    "Detail": "Surgery",
                                    "Location": "Leg",
                                    "Side": "Left",
                                    "ReturnDate": "2020-07-15"
                                }
                            }
                        ]
                    },
                }
            }
        ]
    });
});