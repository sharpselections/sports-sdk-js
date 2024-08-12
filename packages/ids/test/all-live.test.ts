import {SportsSdkIdsClient} from "../src";
import {allApiTests} from "@sports-sdk/core";

const nock = require("nock");

describe("Ids client live tests", () => {
    const client = new SportsSdkIdsClient();
    const nockEndpoint = nock("https://ids.sports-sdk.org");
    allApiTests<SportsSdkIdsClient>({
        client,
        nockEndpoint,
        testCases: [
            {
                name: "lookup using name",
                method: "idLookup",
                params: "mahomes",
                liveTests: {
                    passes: true,
                },
                nockTests: {
                    path: "/",
                    query: true,
                    expectedResponse: [
                        {
                            "id": "272",
                            "entity": "Patrick Mahomes",
                            "sport": "NFL",
                            "source": "KEEPTRADECUT",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"slug\":\"patrick-mahomes-272\",\"position\":\"QB\",\"positionID\":1,\"team\":\"KCC\",\"rookie\":false,\"age\":28.9,\"heightFeet\":6,\"heightInches\":2,\"weight\":225,\"seasonsExperience\":7,\"pickRound\":1,\"pickNum\":10,\"isFeatured\":false,\"isStartSitFeatured\":false,\"isTrending\":false,\"isDevyReturningToSchool\":false,\"isDevyYearDecrement\":false,\"number\":15,\"teamLongName\":\"Kansas City Chiefs\",\"birthday\":\"811314000\",\"draftYear\":2017,\"college\":\"Texas Tech\",\"byeWeek\":6}"
                        },
                        {
                            "id": "945",
                            "entity": "Patrick Mahomes",
                            "sport": "NFL",
                            "source": "FANTASY_NERDS",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"active\":\"1\",\"star\":\"1\",\"position\":\"QB\",\"team\":\"KC\",\"height\":\"6-3\",\"weight\":\"230\",\"dob\":\"1995-09-17\",\"college\":\"Texas Tech\",\"drafted\":\"2017\"}"
                        },
                        {
                            "id": "11839",
                            "entity": "Patrick Mahomes",
                            "sport": "NFL",
                            "source": "ROTOWIRE",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"Position\":\"QB\",\"Profile\":{\"Gender\":\"M\",\"Birth\":{\"Date\":\"1995-09-17\",\"City\":\"\",\"State\":\"\",\"Country\":\"\"},\"Height\":{\"Feet\":\"6'2''\",\"Inches\":74,\"Centimeters\":187.96},\"Weight\":{\"Pounds\":225,\"Kilograms\":102.04},\"College\":\"Texas Tech\"},\"Link\":\"https://www.rotowire.com/football/player/patrick-mahomes-11839\",\"RollingInsightsId\":\"3036\"}"
                        },
                        {
                            "id": "4046",
                            "entity": "Patrick Mahomes",
                            "sport": "NFL",
                            "source": "SLEEPER",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"yahoo_id\":30123,\"sportradar_id\":\"11cad59d-90dd-449c-a839-dddaba4fe16c\",\"pandascore_id\":null,\"search_full_name\":\"patrickmahomes\",\"competitions\":[],\"injury_status\":null,\"sport\":\"nfl\",\"birth_city\":null,\"fantasy_positions\":[\"QB\"],\"birth_date\":\"1995-09-17\",\"news_updated\":1723347632951,\"active\":true,\"birth_state\":null,\"rotowire_id\":11839,\"full_name\":\"Patrick Mahomes\",\"injury_start_date\":null,\"injury_notes\":null,\"birth_country\":null,\"hashtag\":\"#patrickmahomes-NFL-KC-15\",\"status\":\"Active\",\"espn_id\":3139477,\"years_exp\":7,\"team\":\"KC\",\"practice_participation\":null,\"height\":\"74\",\"search_last_name\":\"mahomes\",\"search_rank\":3,\"fantasy_data_id\":18890,\"metadata\":{\"channel_id\":\"1113708747563233280\",\"rookie_year\":\"2017\"},\"opta_id\":null,\"search_first_name\":\"patrick\",\"oddsjam_id\":\"B671C99CB711\",\"gsis_id\":\"00-0033873\",\"age\":28,\"team_abbr\":null,\"college\":\"Texas Tech\",\"stats_id\":839031,\"position\":\"QB\",\"practice_description\":null,\"rotoworld_id\":12142,\"depth_chart_position\":\"QB\",\"swish_id\":839031,\"number\":15,\"injury_body_part\":null,\"high_school\":\"Whitehouse (TX)\",\"depth_chart_order\":1,\"weight\":\"225\"}"
                        },
                        {
                            "id": "65563",
                            "entity": "Patrick Mahomes",
                            "sport": "nfl",
                            "source": "ARE_YOU_WATCHING_THIS",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"number\":\"15\",\"country\":\"USA\",\"teamID\":13322,\"weight\":225,\"position\":\"QB\",\"birthDate\":\"1995-09-17\",\"height\":74}"
                        }
                    ]
                }
            },
            {
                name: "lookup using id",
                method: "idLookup",
                params: "272",
                liveTests: {
                    passes: true,
                },
                nockTests: {
                    path: "/",
                    query: true,
                    expectedResponse: [
                        {
                            "id": "272",
                            "entity": "Chris Johnson",
                            "sport": "NFL",
                            "source": "SLEEPER",
                            "type": "PLAYER",
                            "search": "chrisjohnson",
                            "extras": "{\"yahoo_id\":8801,\"sportradar_id\":\"e5e0c7f9-c4e3-4de4-8052-d9c083393a99\",\"pandascore_id\":null,\"search_full_name\":\"chrisjohnson\",\"competitions\":[],\"injury_status\":null,\"sport\":\"nfl\",\"birth_city\":null,\"fantasy_positions\":[\"DB\",\"RB\"],\"birth_date\":\"1985-09-23\",\"news_updated\":1541453717854,\"active\":false,\"birth_state\":null,\"rotowire_id\":5627,\"full_name\":\"Chris Johnson\",\"injury_start_date\":null,\"injury_notes\":null,\"birth_country\":null,\"hashtag\":\"#chrisjohnson-NFL-FA-23\",\"status\":\"Inactive\",\"espn_id\":11258,\"years_exp\":12,\"team\":null,\"practice_participation\":null,\"height\":\"5'11\\\"\",\"search_last_name\":\"johnson\",\"search_rank\":9999999,\"fantasy_data_id\":6828,\"metadata\":null,\"opta_id\":null,\"search_first_name\":\"chris\",\"oddsjam_id\":null,\"gsis_id\":\"00-0026164\",\"age\":34,\"team_abbr\":null,\"college\":\"East Carolina\",\"stats_id\":268484,\"position\":\"RB\",\"practice_description\":null,\"rotoworld_id\":4743,\"depth_chart_position\":null,\"swish_id\":null,\"number\":23,\"injury_body_part\":null,\"high_school\":\"Olympia (FL)\",\"depth_chart_order\":null,\"weight\":\"203\"}"
                        },
                        {
                            "id": "272",
                            "entity": "Pegguy Arphexad",
                            "sport": "EPL",
                            "source": "ROTOWIRE",
                            "type": "PLAYER",
                            "search": "pegguyarphexad",
                            "extras": "{\"Position\":\"G\",\"Profile\":{\"Gender\":\"M\",\"Birth\":null,\"Height\":null,\"Weight\":null},\"Link\":\"https://www.rotowire.com/soccer/player/pegguy-arphexad-272\"}"
                        },
                        {
                            "id": "272",
                            "entity": "Patrick Mahomes",
                            "sport": "NFL",
                            "source": "KEEPTRADECUT",
                            "type": "PLAYER",
                            "search": "patrickmahomes",
                            "extras": "{\"slug\":\"patrick-mahomes-272\",\"position\":\"QB\",\"positionID\":1,\"team\":\"KCC\",\"rookie\":false,\"age\":28.9,\"heightFeet\":6,\"heightInches\":2,\"weight\":225,\"seasonsExperience\":7,\"pickRound\":1,\"pickNum\":10,\"isFeatured\":false,\"isStartSitFeatured\":false,\"isTrending\":false,\"isDevyReturningToSchool\":false,\"isDevyYearDecrement\":false,\"number\":15,\"teamLongName\":\"Kansas City Chiefs\",\"birthday\":\"811314000\",\"draftYear\":2017,\"college\":\"Texas Tech\",\"byeWeek\":6}"
                        },
                        {
                            "id": "272",
                            "entity": "Francisco Lindor",
                            "sport": "MLB",
                            "source": "FANTASY_NERDS",
                            "type": "PLAYER",
                            "search": "franciscolindor",
                            "extras": "{\"active\":\"1\",\"star\":\"1\",\"position\":\"SS\",\"position_category\":\"IF\",\"team\":\"NYM\",\"height\":\"5-11\",\"weight\":\"190\",\"dob\":\"1993-11-14\",\"college\":\"\"}"
                        }
                    ]
                }
            },
        ]
    });
})