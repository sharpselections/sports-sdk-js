import { z } from "zod";
import { LineupStatusSchema } from "../common/news";
import { PositionSchema } from "./news";

export const SoccerLineupsParametersSchema = z.object({
  season: z.number().optional().describe("Optional season parameter"),
  week: z.number().optional().describe("Optional week parameter")
});

export type SoccerLineupsParameters = z.infer<typeof SoccerLineupsParametersSchema>;

export const SoccerLineupPlayerSchema = z.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Position: PositionSchema
});

export const SoccerLineupTeamSchema = z.object({
  Name: z.string(),
  LineupStatus: LineupStatusSchema,
  Players: z.array(SoccerLineupPlayerSchema),
  Id: z.number()
});

export const SoccerLineupGameSchema = z.object({
  Date: z.string(),
  Id: z.number(),
  Teams: z.array(SoccerLineupTeamSchema)
});

export const SoccerLineupsResponseSchema = z.object({
  Season: z.number(),
  Week: z.number(),
  Games: z.array(SoccerLineupGameSchema)
});

export type SoccerLineupPlayer = z.infer<typeof SoccerLineupPlayerSchema>;
export type SoccerLineupTeam = z.infer<typeof SoccerLineupTeamSchema>;
export type SoccerLineupGame = z.infer<typeof SoccerLineupGameSchema>;
export type SoccerLineupsResponse = z.infer<typeof SoccerLineupsResponseSchema>;
