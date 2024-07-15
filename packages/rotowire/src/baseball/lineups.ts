import { z } from "zod";
import { LineupStatusSchema } from "../common/news";
import { MLBPlayerSchema, MLBTeamCodeSchema } from "./news";

export const MLBLineupsParametersSchema = z.object({
  date: z.string().optional(),
});

export type MLBLineupsParameters = z.infer<typeof MLBLineupsParametersSchema>;

export const MLBLineupPlayerSchema = MLBPlayerSchema.omit({ LeagueLevel: true, Injury: true }).extend({
  BattingSpot: z.number(),
});

export const MLBLineupTeamSchema = z.object({
  Id: z.number(),
  Code: MLBTeamCodeSchema,
  IsHome: z.boolean(),
  LineupStatus: LineupStatusSchema,
  Players: z.array(MLBLineupPlayerSchema),
});

export const MLBLineupGameSchema = z.object({
  DateTime: z.string(),
  Teams: z.array(MLBLineupTeamSchema),
});

export const MLBLineupsResponseSchema = z.object({
  Date: z.string(),
  Games: z.array(MLBLineupGameSchema),
});

export type MLBLineupPlayer = z.infer<typeof MLBLineupPlayerSchema>;
export type MLBLineupTeam = z.infer<typeof MLBLineupTeamSchema>;
export type MLBLineupGame = z.infer<typeof MLBLineupGameSchema>;
export type MLBLineupsResponse = z.infer<typeof MLBLineupsResponseSchema>;
