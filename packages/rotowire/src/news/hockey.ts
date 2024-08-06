import { z } from "zod";
import { BaseNewsResponseSchema, UpdatesSchema } from "./common";


const NHLNewsPrioritySchema = z.union([
  z.literal("1").describe("Biggest News"),
  z.literal("2").describe("Top Players"),
  z.literal("3").describe("Regular News"),
  z.literal("4").describe("Minor leagues"),
  z.literal("5").describe("Foreign/Non-Fantasy")
]);

const NHLInjuryStatusSchema = z.union([
  z.literal("Out"),
  z.literal("Day-To-Day"),
  z.literal("IR"),
  z.literal("IR-NR"),
  z.literal("IR-LT")
]).describe("Injury status");

const NHLInjuryTypeSchema = z.union([
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
  z.literal("Coach’s Decision"),
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
  z.literal("Strain"),
  z.literal("Suspension"),
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

const NHLInjurySchema = z.object({
  Status: NHLInjuryStatusSchema,
  Type: NHLInjuryTypeSchema,
  ReturnDate: z.string().optional().describe("Return date in YYYY-MM-DD format")
});

const NHLTeamSchema = z.object({
  Id: z.number(),
  Code: z.union([
    z.literal("ANA"),
    z.literal("ARI"),
    z.literal("BOS"),
    z.literal("BUF"),
    z.literal("CAR"),
    z.literal("CGY"),
    z.literal("CHI"),
    z.literal("CLM"),
    z.literal("COL"),
    z.literal("DAL"),
    z.literal("DET"),
    z.literal("EDM"),
    z.literal("FLA"),
    z.literal("LAS"),
    z.literal("LOS"),
    z.literal("MIN"),
    z.literal("MON"),
    z.literal("NAS"),
    z.literal("NJD"),
    z.literal("NYI"),
    z.literal("NYR"),
    z.literal("OTT"),
    z.literal("PHI"),
    z.literal("PIT"),
    z.literal("SAN"),
    z.literal("STL"),
    z.literal("TAM"),
    z.literal("TOR"),
    z.literal("VAN"),
    z.literal("WAS"),
    z.literal("WPG"),
    z.literal("SEA"),
    z.literal("UTA")
  ]).describe("NHL team code"),
  Name: z.string(),
  Nickname: z.string()
});

const NHLPlayerSchema = z.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Position: z.union([z.literal("D"), z.literal("LW"), z.literal("RW"), z.literal("C"), z.literal("G")]).describe("Player position"),
  Link: z.string(),
  Injury: NHLInjurySchema
});

const NHLPlayerInjurySchema = NHLPlayerSchema.extend({
  Team: NHLTeamSchema
});

const NHLUpdatesSchema = UpdatesSchema.extend({
  Priority: NHLNewsPrioritySchema,
  Player: NHLPlayerSchema,
  Team: NHLTeamSchema
});

const NHLNewsResponseSchema = BaseNewsResponseSchema.extend({
  Updates: z.array(NHLUpdatesSchema)
});

const NHLInjuriesResponseSchema = z.object({
  Players: z.array(
      NHLPlayerInjurySchema.omit({Link: true, Team: true}),
      z.object({
        Team: NHLTeamSchema.pick({Id: true, Code: true})
      })
  )
});

export type NHLNewsResponse = z.infer<typeof NHLNewsResponseSchema>;
export type NHLUpdates = z.infer<typeof NHLUpdatesSchema>;
export type NHLTeam = z.infer<typeof NHLTeamSchema>;
export type NHLPlayer = z.infer<typeof NHLPlayerSchema>;
export type NHLInjury = z.infer<typeof NHLInjurySchema>;
export type NHLPlayerInjury = z.infer<typeof NHLPlayerInjurySchema>;
export type NHLInjuriesResponse = z.infer<typeof NHLInjuriesResponseSchema>;
