export * from "./utils";
export enum League {
    EPL = "EPL",
    MLB = "MLB",
    NBA = "NBA",
    NCAAF = "NCAAF",
    NFL = "NFL",
    NHL = "NHL"
}

export interface RequestParams {
    [key: string]: any;
}