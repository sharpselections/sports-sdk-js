import {z} from "zod";
import {
    GameSchema, InjuriesSchema,
    PlayerRankingsSchema,
    PlayerStatSchema,
} from "./common.ts";


export const NBADraftProjectionsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    projections: z.array(
        PlayerStatSchema.extend({
            points: z.string(),
            rebounds: z.string(),
            assists: z.string(),
            blocks: z.string(),
            steals: z.string(),
            fg: z.string(),
            ft: z.string(),
            threes: z.string(),
            games_played: z.string(),
            minutes: z.string(),
            turnovers: z.string()
        })
    )
});

export type NBADraftProjectionsResponse = z.infer<typeof NBADraftProjectionsResponseSchema>;

export const NBADraftRankingsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    players: z.array(PlayerRankingsSchema)
});

export type NBADraftRankingsResponse = z.infer<typeof NBADraftRankingsResponseSchema>;

export const NBAScheduleResponseSchema = z.object({
    season: z.string().describe("The season that the data is applicable for"),
    schedule: z.array(
        GameSchema
    )
});

export type NBAScheduleResponse = z.infer<typeof NBAScheduleResponseSchema>;

export const NBAInjuriesResponseSchema = z.object({
    season: z.number(),
    teams: z.record(z.array(InjuriesSchema))
});

export type NBAInjuriesResponse = z.infer<typeof NBAInjuriesResponseSchema>;

export const NBALineupsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    lineup_date: z.string().describe("The date associated with a game's lineup"),
    lineups: z.record(z.record(z.object({
        playerId: z.string().describe("A unique reference ID for a specific player"),
        name: z.string().describe("The player or team name"),
        confirmed: z.string().describe("Indicator if the lineup has been confirmed. '1' is confirmed, '0' is subject to change."),
    })))
});

export type NBALineupsResponse = z.infer<typeof NBALineupsResponseSchema>;

export const NBAPlayerRaterResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    rankings: z.array(PlayerRankingsSchema)
});

export type NBAPlayerRaterResponse = z.infer<typeof NBAPlayerRaterResponseSchema>;
