import {z} from "zod";
import {
    GameSchema,
    PlayerRankingsSchema,
    PlayerStatSchema,
    WeatherSchema
} from "./common.ts";

export const MLBDraftProjectionsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    projections: z.object({
        pitchers: z.array(
            PlayerStatSchema.extend({
                ip: z.string().describe("Innings Pitched"),
                w: z.string().describe("Statistical: wins"),
                so: z.string().describe("Statistical: strikeouts"),
                bb: z.string().describe("Statistical: walks - base on balls"),
                sv: z.string().describe("Statistical: saves"),
                era: z.string().describe("Statistical: earned run average"),
                whip: z.string().describe("Statistical: walks and hits per inning pitched"),
                g: z.string().describe("Statistical: games played"),
                gs: z.string().describe("Statistical: games started")
            })
        ),
        hitters: z.array(
            PlayerStatSchema.extend({
                ab: z.string().describe("Statistical: at bats"),
                r: z.string().describe("Statistical: runs"),
                hr: z.string().describe("Statistical: home runs"),
                rbi: z.string().describe("Statistical: runs batted in"),
                sb: z.string().describe("Statistical: stolen bases"),
                avg: z.string().describe("Statistical: batting average"),
                ops: z.string().describe("Statistical: on-base percentage"),
                h: z.string().describe("Statistical: hits"),
                "2b": z.string().describe("Statistical: doubles"),
                "3b": z.string().describe("Statistical: triples")
            })
        )
    })
});

export type MLBDraftProjectionsResponse = z.infer<typeof MLBDraftProjectionsResponseSchema>;


export const MLBDraftRankingsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    players: z.array(PlayerRankingsSchema)
});

export type MLBDraftRankingsResponse = z.infer<typeof MLBDraftRankingsResponseSchema>;

export const MLBScheduleResponseSchema = z.object({
    current_week: z.null(),
    schedule: z.array(
        GameSchema.extend({
                season: z.string().describe("The season that the data is applicable for"),
            }
        )
    )
});

export type MLBScheduleResponse = z.infer<typeof MLBScheduleResponseSchema>;

export const MLBLineupsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    lineup_date: z.string().describe("The date associated with a game's lineup"),
    games: z.array(
        z.object({
            gameId: z.number().describe("A unique reference ID for a specific game"),
            away_team: z.string().describe("The visiting team code"),
            home_team: z.string().describe("The home team code"),
            lineups: z.object({
                away: z.object({
                    lineup_confirmed: z.string().describe("Indicator if the lineup has been confirmed. '1' is confirmed, '0' is subject to change."),
                    starting_pitcher: z.object({
                        playerId: z.string().describe("A unique reference ID for a specific player"),
                        name: z.string().describe("The player or team name")
                    }),
                    lineup: z.array(
                        z.object({
                            playerId: z.string().describe("A unique reference ID for a specific player"),
                            name: z.string().describe("The player or team name"),
                            position: z.string().describe("A player's primary position")
                        })
                    )
                }),
                home: z.object({
                    lineup_confirmed: z.string().describe("Indicator if the lineup has been confirmed. '1' is confirmed, '0' is subject to change."),
                    starting_pitcher: z.object({
                        playerId: z.string().describe("A unique reference ID for a specific player"),
                        name: z.string().describe("The player or team name")
                    }),
                    lineup: z.array(
                        z.object({
                            playerId: z.string().describe("A unique reference ID for a specific player"),
                            name: z.string().describe("The player or team name"),
                            position: z.string().describe("A player's primary position")
                        })
                    )
                })
            })
        })
    )
});

export type MLBLineupsResponse = z.infer<typeof MLBLineupsResponseSchema>;

export const MLBPlayerRaterResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    rankings: z.array(PlayerRankingsSchema)
});

export type MLBPlayerRaterResponse = z.infer<typeof MLBPlayerRaterResponseSchema>;

export const MLBAuctionValuesResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    budget: z.number().describe("The league budget"),
    players: z.array(
        z.object({
            playerId: z.string().describe("A unique reference ID for a specific player"),
            name: z.string().describe("The player or team name"),
            team: z.string().describe("An alias of team_code"),
            position: z.string().describe("A player's primary position"),
            auction_value: z.string().describe("The consensus auction value for a player - the most fair price to bid.")
        })
    )
});

export type MLBAuctionValuesResponse = z.infer<typeof MLBAuctionValuesResponseSchema>;

export const MLBWeatherResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    lineup_date: z.string().describe("The date associated with a game's lineup"),
    teams: z.record(z.array(WeatherSchema))
});

export type MLBWeatherResponse = z.infer<typeof MLBWeatherResponseSchema>;
