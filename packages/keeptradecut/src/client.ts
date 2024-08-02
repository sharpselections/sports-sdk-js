import {SportsSdkClient} from "@sports-sdk/core";
import {load} from "cheerio";
import {PlayerData, PlayerHistory, PlayerPositions, Position} from "./types"; // Assuming you have the types defined in a file called types.ts

interface RequestParams {
    [key: string]: any;
}

export class KeepTradeCutClient extends SportsSdkClient {
    constructor() {
        super("https://keeptradecut.com");
    }

    /**
     * Sends a GET request to the specified URL with the provided parameters.
     * @param apiPath - The path to append to the URL when sending the request.
     * @param additionalParams - Additional query parameters for the request.
     * @returns The response data from the API.
     * @throws Will throw an error if the request fails.
     */
    protected async request({apiPath, additionalParams = {}}: {
        apiPath: string,
        additionalParams?: RequestParams
    }): Promise<PlayerData[]> {
        const response = await this.session.get(apiPath, {
            params: additionalParams
        });

        if (response.status !== 200) {
            throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
        }

        const $ = load(response.data);
        const data: PlayerData[] = [];  // Using the PlayerData type

        $('script').each((_, script) => {
            const scriptText = $(script).html();
            if (scriptText && /var\splayersArray\b/.test(scriptText)) {
                const match = scriptText.match(/var playersArray = (\[.*?\]);/s);
                if (match) {
                    const arrayString = match[1];
                    const parsedData = JSON.parse(arrayString) as PlayerData[]; // Ensure the parsed data matches PlayerData[]
                    data.push(...parsedData);
                }
            }
        });

        return data; // Return the typed data
    }

    public async getPlayerRankings(positions?: Position[]): Promise<PlayerData[]> {
        return await this.request({
            apiPath: "/dynasty-rankings",
            additionalParams: positions ? {
                filters: positions.join("|")
            } : {}
        });
    }

    public async getRookieRankings(position?: PlayerPositions): Promise<PlayerData[]> {
        return await this.request({
            apiPath: `/dynasty-rankings/rookie-rankings` + (position ? `/${position.toLowerCase()}-rankings` : ""),
        });
    }

    public async getDevyRankings(positions?: PlayerPositions[]): Promise<PlayerData[]> {
        return await this.request({
            apiPath: "/devy-rankings",
            additionalParams: positions ? {
                filters: positions.join("|")
            } : {}
        });
    }

    public async getPlayerHistory(playerIds: string[]): Promise<Array<PlayerHistory>> {
        // extract this logic if KTC moves to this pattern more widely
        const response = await this.session.post("/dynasty-rankings/histories", playerIds);

        if (response.status !== 200) {
            throw new Error(`Failed to get a valid response: status code ${response.status}, response body ${response.data}`);
        }

        return response.data as Array<PlayerHistory>;
    }
}
