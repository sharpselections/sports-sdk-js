import {Sport} from "@sports-sdk/core";
import {MLBInjuriesResponse, MLBNewsResponse} from "./news/baseball.ts";
import {NCAAFInjuriesResponse, NCAAFNewsResponse, NFLInjuriesResponse, NFLNewsResponse} from "./news/football.ts";
import {EPLInjuriesResponse, EPLNewsResponse} from "./news/soccer.ts";
import {NBAInjuriesResponse, NBANewsResponse} from "./news/basketball.ts";
import {NHLInjuriesResponse, NHLNewsResponse} from "./news/hockey.ts";
import {MLBLineupsParameters, MLBLineupsResponse} from "./lineups/baseball.ts";
import {SoccerLineupsParameters, SoccerLineupsResponse} from "./lineups/soccer.ts";
import {NBALineupsParameters, NBALineupsResponse} from "./lineups/basketball.ts";

export type NewsResponse<T extends Sport> =
    T extends Sport.MLB ? MLBNewsResponse :
        T extends Sport.NFL ? NFLNewsResponse :
            T extends Sport.NCAAF ? NCAAFNewsResponse :
                T extends Sport.EPL ? EPLNewsResponse :
                    T extends Sport.NBA ? NBANewsResponse :
                        T extends Sport.NHL ? NHLNewsResponse :
                            never;

export type InjuriesResponse<T extends Sport> =
    T extends Sport.MLB ? MLBInjuriesResponse :
        T extends Sport.NFL ? NFLInjuriesResponse :
            T extends Sport.NCAAF ? NCAAFInjuriesResponse :
                T extends Sport.EPL ? EPLInjuriesResponse :
                    T extends Sport.NBA ? NBAInjuriesResponse :
                        T extends Sport.NHL ? NHLInjuriesResponse :
                            never;

export type LineupsParams<T extends Sport> =
    T extends Sport.MLB ? MLBLineupsParameters :
        T extends Sport.EPL ? SoccerLineupsParameters :
            T extends Sport.NBA ? NBALineupsParameters :
                never;

export type LineupResponse<T extends Sport> =
    T extends Sport.MLB ? MLBLineupsResponse :
        T extends Sport.EPL ? SoccerLineupsResponse :
            T extends Sport.NBA ? NBALineupsResponse :
                never;