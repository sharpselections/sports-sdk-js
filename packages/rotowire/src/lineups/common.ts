import { z } from "zod"

export const LineupStatusSchema = z.union([z.literal("X"), z.literal("C")])

export type LineupStatus = z.infer<typeof LineupStatusSchema>;
