import { z } from "zod";
import { BaseNewsResponseSchema, UpdatesSchema } from "./common";

const SoccerNewsPrioritySchema = z.union([
  z.literal("1").describe("Biggest News"),
  z.literal("2").describe("Top Players"),
  z.literal("3").describe("Regular News"),
  z.literal("4").describe("Depth/Backup Players"),
  z.literal("5").describe("Non-Fantasy")
]);

export const PositionSchema = z.union([
  z.literal("M"),
  z.literal("D"),
  z.literal("M/D"),
  z.literal("F"),
  z.literal("F/M"),
  z.literal("G")
]).describe("Player position");

const SoccerInjuryTypeSchema = z.union([
  z.literal("None"),
  z.literal("Abdomen"),
  z.literal("Abrasion"),
  z.literal("Academics"),
  z.literal("Achilles"),
  z.literal("Ankle"),
  z.literal("Arm"),
  z.literal("Back"),
  z.literal("Biceps"),
  z.literal("Bruise"),
  z.literal("Calf"),
  z.literal("Coach's Decision"),
  z.literal("Chest"),
  z.literal("Collarbone"),
  z.literal("Concussion"),
  z.literal("Contract Dispute"),
  z.literal("Ear"),
  z.literal("Elbow"),
  z.literal("Eye"),
  z.literal("Face"),
  z.literal("Finger"),
  z.literal("Foot"),
  z.literal("Forearm"),
  z.literal("Forehead"),
  z.literal("Fracture"),
  z.literal("Groin"),
  z.literal("Hamstring"),
  z.literal("Hand"),
  z.literal("Head"),
  z.literal("Heel"),
  z.literal("Hip"),
  z.literal("Illness"),
  z.literal("Infection"),
  z.literal("Impaired Vision"),
  z.literal("Jaw"),
  z.literal("Knee"),
  z.literal("Kneecap"),
  z.literal("Laceration"),
  z.literal("Leg"),
  z.literal("Lips"),
  z.literal("Lower Body"),
  z.literal("Lower Leg"),
  z.literal("Mouth"),
  z.literal("Neck"),
  z.literal("Nose"),
  z.literal("Not Injury Related"),
  z.literal("Oblique"),
  z.literal("Orbital"),
  z.literal("Pectoral"),
  z.literal("Pelvis"),
  z.literal("Personal"),
  z.literal("Pinched Nerve"),
  z.literal("Quadriceps"),
  z.literal("Rest"),
  z.literal("Ribs"),
  z.literal("Shoulder"),
  z.literal("Side"),
  z.literal("Skull"),
  z.literal("Spasms"),
  z.literal("Sprain"),
  z.literal("Stinger"),
  z.literal("Suspension"),
  z.literal("Strain"),
  z.literal("Tear"),
  z.literal("Teeth"),
  z.literal("Thigh"),
  z.literal("Thumb"),
  z.literal("Temple"),
  z.literal("Toe"),
  z.literal("Triceps"),
  z.literal("Undisclosed"),
  z.literal("Upper Body"),
  z.literal("Upper Leg"),
  z.literal("Wrist")
]).describe("Injury types");

const SoccerInjuryStatusSchema = z.union([
  z.literal("GTD"),
  z.literal("OUT"),
  z.literal("SUS")
]).describe("Injury status");

const SoccerInjurySchema = z.object({
  Type: SoccerInjuryTypeSchema,
  Status: SoccerInjuryStatusSchema,
  ReturnDate: z.string().describe("Return date in YYYY-MM-DD format")
});

const SoccerPlayerSchema = z.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Position: PositionSchema,
  Link: z.string()
});

const SoccerPlayerInjurySchema = SoccerPlayerSchema.omit({ Link: true }).extend({
  Injury: SoccerInjurySchema
});

const SoccerTeamSchema = z.object({
  Id: z.number(),
  Name: z.string()
});

const SoccerUpdatesSchema = UpdatesSchema.extend({
  Priority: SoccerNewsPrioritySchema,
  Player: SoccerPlayerSchema,
  Team: SoccerTeamSchema
});

const SoccerNewsResponseSchema = BaseNewsResponseSchema.extend({
  Updates: z.array(SoccerUpdatesSchema)
});

const SoccerInjuriesResponseSchema = z.object({
  League: z.string(),
  Players: z.array(SoccerPlayerInjurySchema)
})

// EPL specific schemas
export const EPLNewsResponseSchema = SoccerNewsResponseSchema.extend({});
export type EPLNewsResponse = z.infer<typeof EPLNewsResponseSchema>;

export const EPLInjuriesResponseSchema = SoccerInjuriesResponseSchema.omit({League: true}).extend({
  League: z.literal("EPL")
});
export type EPLInjuriesResponse = z.infer<typeof EPLInjuriesResponseSchema>;

export type EPLUpdates = z.infer<typeof SoccerUpdatesSchema>;
export type EPLPlayer = z.infer<typeof SoccerPlayerSchema>;
export type EPLPlayerInjury = z.infer<typeof SoccerPlayerInjurySchema>;
export type EPLTeam = z.infer<typeof SoccerTeamSchema>;
export type EPLInjury = z.infer<typeof SoccerInjurySchema>;
