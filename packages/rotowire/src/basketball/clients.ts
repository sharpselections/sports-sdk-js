import {RotowireClient} from "../common/client";
import {Sport} from "@sports-sdk/core";
import {NBAInjuriesResponse, NBANewsResponse} from "./news";
import {NewsParameters} from "../common/news";
import {NBALineupsParameters, NBALineupsResponse} from "./lineups";

export class NBARotowireClient extends RotowireClient {
    private readonly sport = Sport.NBA

    public async getNews<T extends NBANewsResponse>({params}: { params?: NewsParameters }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends NBAInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }

    public async getLineups<T extends NBALineupsResponse>({params}: { params?: NBALineupsParameters }): Promise<T> {
        return this.genericGetLineups<T>({
            sport: this.sport,
            params
        });
    }
}