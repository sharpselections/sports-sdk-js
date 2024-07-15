import {RotowireClient} from "../common/client";
import {Sport} from "@sports-sdk/core";
import {NCAAFInjuriesResponse, NCAAFNewsResponse, NFLInjuriesResponse, NFLNewsResponse} from "./news";
import {NewsParameters} from "../common/news";

export class NFLRotowireClient extends RotowireClient {
    private readonly sport = Sport.NFL
    public async getNews<T extends NFLNewsResponse>({params}: { params?: NewsParameters }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends NFLInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }
}


export class NCAAFRotowireClient extends RotowireClient {
    private readonly sport = Sport.NCAAF
    public async getNews<T extends NCAAFNewsResponse>({params}: { params?: NewsParameters }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends NCAAFInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }
}