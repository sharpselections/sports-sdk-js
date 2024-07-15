import { z } from "zod";
import { LineupStatusSchema } from "../common/news";
import { NBAPlayerSchema, NBATeamCodeSchema } from "./news";

export const NBALineupsParametersSchema = z.object({
  date: z.string().optional().describe("Optional date parameter"),
  position: z.string().optional().describe("Optional position parameter"),
  team: z.string().optional().describe("Optional team parameter")
});

export type NBALineupsParameters = z.infer<typeof NBALineupsParametersSchema>;

export const NBALineupPlayerSchema = NBAPlayerSchema.omit({ Link: true, InjuryStatus: true });

export const NBALineupTeamSchema = z.object({
  Id: z.number(),
  Code: NBATeamCodeSchema,
  Status: LineupStatusSchema,
  IsHome: z.boolean(),
  Name: z.string(),
  Nickname: z.string(),
  Players: z.array(NBALineupPlayerSchema),
  Bench: z.array(NBALineupPlayerSchema)
});

export const NBALineupGameSchema = z.object({
  Id: z.number(),
  DateTime: z.string(),
  Teams: z.array(NBALineupTeamSchema)
});

export const NBALineupsResponseSchema = z.object({
  Date: z.string(),
  Games: z.array(NBALineupGameSchema)
});

export type NBALineupPlayer = z.infer<typeof NBALineupPlayerSchema>;
export type NBALineupTeam = z.infer<typeof NBALineupTeamSchema>;
export type NBALineupGame = z.infer<typeof NBALineupGameSchema>;
export type NBALineupsResponse = z.infer<typeof NBALineupsResponseSchema>;
