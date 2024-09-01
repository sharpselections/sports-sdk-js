import {z} from "zod"

export const NcaafPlayerInfoSchema = z.object({
    player_id: z.number(),
    player: z.string(),
    team: z.string(),
    team_id: z.number(),
    number: z.number(),
    status: z.string(),
    position: z.string(),
    position_category: z.string(),
    height: z.string(),
    weight: z.string(),
    class: z.string()
});

export type NcaafPlayerInfo = z.infer<typeof NcaafPlayerInfoSchema>;

export const NcaafTeamInfoSchema = z.object({
    team_id: z.number(),
    team: z.string(),
    abbrv: z.string().nullable(),
    mascot: z.string().nullable(),
    rank: z.null().nullable(),
    week: z.number().nullable(),
    conf_ID: z.number().nullable(),
    conf: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    arena: z.string().nullable(),
    country: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    field: z.string().nullable(),
    postal_code: z.string().nullable(),
    dome: z.number().nullable()
});

export type NcaafTeamInfo = z.infer<typeof NcaafTeamInfoSchema>;
