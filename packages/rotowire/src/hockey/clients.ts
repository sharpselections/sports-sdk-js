import {RotowireClient} from "../common/client";
import {Sport} from "@sports-sdk/core";
import {NHLInjuriesResponse, NHLNewsResponse} from "./news";
import {NewsParameters} from "../common/news";

export class NHLRotowireClient extends RotowireClient {
    private readonly sport = Sport.NHL
    public async getNews<T extends NHLNewsResponse>({params}: { params?: NewsParameters }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends NHLInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }
}