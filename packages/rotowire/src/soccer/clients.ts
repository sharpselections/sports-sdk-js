import {RotowireClient} from "../common/client";
import {Sport} from "@sports-sdk/core";
import {EPLInjuriesResponse, EPLNewsResponse} from "./news";
import {NewsParameters} from "../common/news";
import {SoccerLineupsParameters, SoccerLineupsResponse} from "./lineups";

export class EPLRotowireClient extends RotowireClient {
    private readonly sport = Sport.EPL

    public async getNews<T extends EPLNewsResponse>({params}: { params?: NewsParameters }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends EPLInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }

    public async getLineups<T extends SoccerLineupsResponse>({params}: {
        params?: SoccerLineupsParameters
    }): Promise<T> {
        return this.genericGetLineups<T>({
            sport: this.sport,
            params
        });
    }
}