import {SportsSdkClient} from "@sports-sdk/core";
import {IdRecord} from "./types.ts";

export class SportsSdkIdsClient extends SportsSdkClient {
    constructor() {
        super("https://ids.sports-sdk.org");
    }

    /**
     * Lookup the ids associated with the provided search value
     * @param search - The character or number sequence to find the ids associated with
     * @returns A list of id records.
     */
    async idLookup(search: string): Promise<IdRecord[]> {
        const response = await this.session.get("", {
            params: {
                search
            }
        });
        return response.data as IdRecord[];
    }
}