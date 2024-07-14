import {RotowireClient} from "../common/client";
import {Sport} from "@sports-sdk/core";
import {MLBInjuriesResponse, MLBNewsParameters, MLBNewsResponse} from "./news";
import {MLBLineupsParameters, MLBLineupsResponse} from "./lineups";

export class MLBRotowireClient extends RotowireClient {
    private readonly sport = Sport.MLB

    public async getNews<T extends MLBNewsResponse = MLBNewsResponse>({params}: {
        params?: MLBNewsParameters
    }): Promise<T> {
        return super.genericGetNews<T>({
            sport: this.sport,
            params,
        });
    }

    public async getInjuries<T extends MLBInjuriesResponse>(): Promise<T> {
        return super.genericGetInjuries<T>({
            sport: this.sport,
        });
    }

    public async getLineups<T extends MLBLineupsResponse>({params}: { params?: MLBLineupsParameters }): Promise<T> {
        return this.genericGetLineups<T>({
            sport: this.sport,
            params
        });
    }
}
