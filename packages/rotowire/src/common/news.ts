import { z } from "zod"

export const NewsParametersSchema = z.object({
  date: z.string().optional(),
  hours: z.number().optional(),
  max_priority: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5)
    ])
    .optional(),
  with_analysis: z.boolean().optional()
});

export type NewsParameters = z.infer<typeof NewsParametersSchema>;

export const UpdatesSchema = z.object({
  Id: z.number(),
  DateTime: z.string(),
  Headline: z.string(),
  Notes: z.string(),
  Analysis: z.string()
});

export type Updates = z.infer<typeof  UpdatesSchema>;

export const InjurySideSchema = z.union([
  z.literal("Not Specified"),
  z.literal("Left"),
  z.literal("Right")
]);

export type InjurySide = z.infer<typeof InjurySideSchema>;

export const LineupStatusSchema = z.union([z.literal("X"), z.literal("C")])

export type LineupStatus = z.infer<typeof LineupStatusSchema>;
export const BaseNewsResponseSchema = z.object({
  Date: z.string(),
  Updates: z.array(UpdatesSchema)
});

export type BaseNewsResponse = z.infer<typeof BaseNewsResponseSchema>;

export const BaseInjuriesResponseSchema = z.object({
    Players: z.array(z.any())
});

export type BaseInjuriesResponse = z.infer<typeof BaseInjuriesResponseSchema>;