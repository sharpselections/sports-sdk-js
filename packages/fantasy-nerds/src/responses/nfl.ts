import {z} from "zod";
import {
    GameSchema, InjuriesSchema,
    PlayerRankingsSchema,
    PlayerStatSchema, WeatherSchema,
} from "./common.ts";

export const NFLAuctionValuesResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    budget: z.number().describe("The league budget"),
    teams: z.number(),
    format: z.string(),
    players: z.array(
        z.object({
            playerId: z.string().describe("A unique reference ID for a specific player"),
            name: z.string().describe("The player or team name"),
            team: z.string().describe("An alias of team_code"),
            position: z.string().describe("A player's primary position"),
            auction_value: z.string().describe("The consensus auction value for a player - the most fair price to bid."),
            min_value: z.string(),
            max_value: z.string(),
        })
    )
});

export type NFLAuctionValuesResponse = z.infer<typeof NFLAuctionValuesResponseSchema>;

export const NFLPlayerADPResponseSchema = z.object({
    season: z.number(),
    teams: z.number(),
    format: z.string(),
    players: z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            rank: z.string(),
            pick: z.string()
        })
    )
});

export type NFLPlayerADPResponse = z.infer<typeof NFLPlayerADPResponseSchema>;

export const NFLByesResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    weeks: z.record(z.object({
        week: z.string(),
        teams: z.array(z.string())
    }))
});

export type NFLByesResponse = z.infer<typeof NFLByesResponseSchema>;

export const NFLDFSResponseSchema = z.object({
    season: z.string(),
    week: z.string(),
    platform: z.string(),
    slateId: z.number(),
    slate_name: z.string(),
    roster_requirements: z.record(z.number()),
    players: z.array(
        z.object({
            playerId: z.string(),
            salary: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            slate_playerId: z.string(),
            injury: z.string().nullish(),
            ownership: z.string(),
            proj_pts: z.number(),
            proj_pts_conservative: z.number(),
            proj_pts_aggressive: z.number(),
            bang_for_your_buck: z.number(),
            bang_for_your_buck_conservative: z.number(),
            bang_for_your_buck_aggressive: z.number()
        })
    )
});

export type NFLDFSResponse = z.infer<typeof NFLDFSResponseSchema>;

export const NFLDFSSlateResponseSchema = z.object({
    season: z.number(),
    week: z.number(),
    platforms: z.record(z.array(
        z.object({
            slateId: z.string(),
            vendor_slateId: z.string(),
            vendor: z.string(),
            week: z.string(),
            season: z.string(),
            slate_name: z.string(),
            slate_start: z.string(),
            teams: z.string()
        })
    ))
});

export type NFLDFSSlateResponse = z.infer<typeof NFLDFSSlateResponseSchema>;

export const NFLDefensiveRanksResponseSchema = z.record(z.union([
        z.number(),
        z.array(
            z.object({
                team: z.string(),
                ranks: z.object({std: z.string(), half: z.string(), ppr: z.string()}),
                fantasy_points_allowed: z.object({
                    std: z.string(),
                    half: z.string(),
                    ppr: z.string()
                })
            })
        )
    ])
);

export type NFLDefensiveRanksResponse = z.infer<typeof NFLDefensiveRanksResponseSchema>;

const playerProjectionsSchema = z.record(z.union([
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            passing_attempts: z.string(),
            passing_completions: z.string(),
            passing_yards: z.string(),
            passing_touchdowns: z.string(),
            passing_interceptions: z.string(),
            rushing_attempts: z.string(),
            rushing_yards: z.string(),
            rushing_touchdowns: z.string(),
            fumbles: z.string(),
            fumbles_lost: z.string()
        })
    ),
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            rushing_attempts: z.string(),
            rushing_yards: z.string(),
            rushing_touchdowns: z.string(),
            targets: z.string(),
            receptions: z.string(),
            receiving_yards: z.string(),
            receiving_touchdowns: z.string(),
            fumbles: z.string(),
            fumbles_lost: z.string()
        })
    ),
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            rushing_attempts: z.string(),
            rushing_yards: z.string(),
            rushing_touchdowns: z.string(),
            targets: z.string(),
            receptions: z.string(),
            receiving_yards: z.string(),
            receiving_touchdowns: z.string(),
            fumbles: z.string(),
            fumbles_lost: z.string()
        })
    ),
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            rushing_attempts: z.string(),
            rushing_yards: z.string(),
            rushing_touchdowns: z.string(),
            targets: z.string(),
            receptions: z.string(),
            receiving_yards: z.string(),
            receiving_touchdowns: z.string(),
            fumbles: z.string(),
            fumbles_lost: z.string()
        })
    ),
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            field_goals_attempted: z.string(),
            field_goals_made: z.string(),
            extra_points_attempted: z.string(),
            extra_points_made: z.string()
        })
    ),
    z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            sacks: z.string(),
            fumbled_forced: z.string(),
            fumbles_recovered: z.string(),
            fumble_return_touchdowns: z.string(),
            interceptions: z.string(),
            interception_touchdowns: z.string(),
            tackles: z.string(),
            safeties: z.string()
        })
    )
]));

export const NFLDraftProjectionsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    projections: playerProjectionsSchema
});

export type NFLDraftProjectionsResponse = z.infer<typeof NFLDraftProjectionsResponseSchema>;

export const NFLDraftRankingsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    format: z.string(),
    players: z.array(
        PlayerRankingsSchema.extend({injury_risk: z.string()})
    )
});

export type NFLDraftRankingsResponse = z.infer<typeof NFLDraftRankingsResponseSchema>;

export const NFLRankingsResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    players: z.array(
        PlayerRankingsSchema
    )
});

/**
 * Works for Dynasty, Best Ball, IDP draft
 */
export type NFLRankingsResponse = z.infer<typeof NFLRankingsResponseSchema>;

export const NFLWeeklyRankingsResponseSchema = NFLRankingsResponseSchema.extend({
    week: z.number()
});

/**
 * Works for IDP & Weekly rankings
 */
export type NFLWeeklyRankingsResponse = z.infer<typeof NFLWeeklyRankingsResponseSchema>;

export const NFLFantasyLeadersResponseSchema = z.object({
    season: z.number(),
    format: z.string(),
    week: z.number(),
    position: z.string(),
    players: z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            points: z.string(),
            rank: z.number()
        })
    )
});

export type NFLFantasyLeadersResponse = z.infer<typeof NFLFantasyLeadersResponseSchema>;

export const NFLInjuriesResponseSchema = z.object({
    season: z.number(),
    week: z.number(),
    teams: z.record(z.array(InjuriesSchema))
});

export type NFLInjuriesResponse = z.infer<typeof NFLInjuriesResponseSchema>;


export const NFLPicksResponseSchema = z.object({
    season: z.number(),
    week: z.number(),
    games: z.record(z.object({
        gameId: z.number(),
        away_team: z.string(),
        home_team: z.string(),
        picks: z.array(z.object({
            expertId: z.string(),
            expert_name: z.string(),
            expert_company: z.string(),
            expert_pick: z.string(),
        }))
    }))
});

export type NFLPicksResponse = z.infer<typeof NFLPicksResponseSchema>;

export const NFLScheduleResponseSchema = z.object({
    current_week: z.string(),
    schedule: z.array(
        GameSchema.extend({
            season: z.string(),
            week: z.string(),
            tv_station: z.string()
        })
    )
});

export type NFLScheduleResponse = z.infer<typeof NFLScheduleResponseSchema>;

export const NFLStandingsResponseSchema = z.array(z.object({
    season: z.number(),
    team: z.string(),
    team_name: z.string(),
    conference: z.string(),
    division: z.string(),
    wins: z.number(),
    losses: z.number(),
    ties: z.number(),
    division_rank: z.number(),
    conference_rank: z.number()
}));

export type NFLStandingsResponse = z.infer<typeof NFLStandingsResponseSchema>;

export const NFLAddDropsResponseSchema = z.object({
    most_added: z.array(PlayerStatSchema),
    most_dropped: z.array(PlayerStatSchema)
});

export type NFLAddDropsResponse = z.infer<typeof NFLAddDropsResponseSchema>;

export const NFLTiersResponseSchema = z.object({
    season: z.number(),
    tiers: z.record(z.record(z.array(PlayerStatSchema.extend({tier: z.string()}))))
});

export type NFLTiersResponse = z.infer<typeof NFLTiersResponseSchema>;

export const NFLPlayoffProjectionsResponseSchema = z.object({
    season: z.number(),
    playoff_week: z.number(),
    teams: z.array(z.string()),
    projections: z.array(
        z.object({
            playerId: z.string(),
            name: z.string(),
            team: z.string(),
            position: z.string(),
            passing_attempts: z.string(),
            passing_completions: z.string(),
            passing_yards: z.string(),
            passing_touchdowns: z.string(),
            passing_interceptions: z.string(),
            rushing_attempts: z.string(),
            rushing_yards: z.string(),
            rushing_touchdowns: z.string(),
            targets: z.string(),
            receptions: z.string(),
            receiving_yards: z.string(),
            receiving_touchdowns: z.string(),
            fumbles: z.string(),
            field_goals_attempted: z.string(),
            field_goals_made: z.string(),
            extra_points_attempted: z.string(),
            extra_points_made: z.string(),
            proj_pts: z.string(),
            proj_pts_ppr: z.string()
        })
    )
})

export type NFLPlayoffProjectionsResponse = z.infer<typeof NFLPlayoffProjectionsResponseSchema>;

export const NFLROSProjectionsResponseSchema = z.object({
    season: z.number(),
    projections: z.record(z.union([
            z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    passing_attempts: z.string(),
                    passing_completions: z.string(),
                    passing_yards: z.string(),
                    passing_touchdowns: z.string(),
                    passing_interceptions: z.string(),
                    rushing_attempts: z.string(),
                    rushing_yards: z.string(),
                    rushing_touchdowns: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    rushing_attempts: z.string(),
                    rushing_yards: z.string(),
                    rushing_touchdowns: z.string(),
                    fumbles: z.string(),
                    receptions: z.string(),
                    receiving_yards: z.string(),
                    receiving_touchdowns: z.string(),
                    targets: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    rushing_attempts: z.string(),
                    rushing_yards: z.string(),
                    rushing_touchdowns: z.string(),
                    fumbles: z.string(),
                    receptions: z.string(),
                    receiving_yards: z.string(),
                    receiving_touchdowns: z.string(),
                    targets: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    rushing_attempts: z.string(),
                    rushing_yards: z.string(),
                    rushing_touchdowns: z.string(),
                    fumbles: z.string(),
                    receptions: z.string(),
                    receiving_yards: z.string(),
                    receiving_touchdowns: z.string(),
                    targets: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    field_goals_made: z.string(),
                    field_goals_attempted: z.string(),
                    extra_points_made: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    fumbled_forced: z.string(),
                    sacks: z.string(),
                    defensive_touchdowns: z.string(),
                    safeties: z.string(),
                    points_allowed: z.string(),
                    yards_allowed: z.string(),
                    proj_pts: z.string()
                })
            ), z.array(
                z.object({
                    playerId: z.string(),
                    name: z.string(),
                    team: z.string(),
                    position: z.string(),
                    tackles: z.string(),
                    assists: z.string(),
                    sacks: z.string(),
                    passes_defended: z.string(),
                    fumbled_forced: z.string(),
                    interceptions: z.string(),
                    interception_touchdowns: z.string(),
                    fumble_return_touchdowns: z.string(),
                    proj_pts: z.string()
                })
            )
        ])
    )
});

export type NFLROSProjectionsResponse = z.infer<typeof NFLROSProjectionsResponseSchema>;

export const NFLWeatherResponseSchema = z.object({
    season: z.number().describe("The season that the data is applicable for"),
    week: z.number(),
    teams: z.record(z.array(WeatherSchema))
});

export type NFLWeatherResponse = z.infer<typeof NFLWeatherResponseSchema>;

export const NFLWeeklyProjectionsResponseSchema = z.object({
    season: z.number(),
    week: z.number(),
    players: playerProjectionsSchema,
});

export type NFLWeeklyProjectionsResponse = z.infer<typeof NFLWeeklyProjectionsResponseSchema>;

