import { z } from "zod";
import { BaseNewsResponseSchema, UpdatesSchema } from "../common/news";

export const NBANewsPrioritySchema = z.union([
    z.literal(1).describe("Biggest News"),
    z.literal(2).describe("Substantive News"),
    z.literal(3).describe("Regular News"),
    z.literal(4).describe("G-league/summer league/foreign/exhibition"),
    z.literal(5).describe("Non-fantasy"),
]);

export const NBAInjuryStatusSchema = z.union([
  z.literal("GTD"),
  z.literal("OUT"),
  z.literal("OFS")
]).describe("Injury status can be 'GTD', 'OUT', or 'OFS'");

export const NBAInjuryTypeSchema = z.union([
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
]).describe("Types of injuries");

export const NBAInjuryDetailSchema = z.union([
  z.literal("None"),
  z.literal("Not Specified"),
  z.literal("Abrasion"),
  z.literal("Bone Spur"),
  z.literal("Bruise"),
  z.literal("Concussion"),
  z.literal("Cramps"),
  z.literal("Dislocated"),
  z.literal("Fracture"),
  z.literal("Impaired Vision"),
  z.literal("Infection"),
  z.literal("Inflammation"),
  z.literal("Jammed"),
  z.literal("Laceration"),
  z.literal("Mild"),
  z.literal("Moderate"),
  z.literal("Pinched Nerve"),
  z.literal("Plantar Fasciitis"),
  z.literal("Ruptured"),
  z.literal("Severe"),
  z.literal("Soreness"),
  z.literal("Spasms"),
  z.literal("Sprain"),
  z.literal("Stinger"),
  z.literal("Strain"),
  z.literal("Surgery"),
  z.literal("Tendinitis")
]).describe("Injury details");

export const NBAInjuryLocationSchema = z.union([
  z.literal("Head"),
  z.literal("Arm"),
  z.literal("Torso"),
  z.literal("Groin"),
  z.literal("Leg"),
  z.literal("Other"),
  z.literal("Not Specified")
]).describe("Location of the injury");

export const InjurySideSchema = z.union([
  z.literal("Not Specified"),
  z.literal("Left"),
  z.literal("Right")
]).describe("Side of the injury");

export const NBAInjurySchema = z.object({
  Status: NBAInjuryStatusSchema,
  Type: NBAInjuryTypeSchema,
  Detail: NBAInjuryDetailSchema,
  Location: NBAInjuryLocationSchema,
  Side: InjurySideSchema,
  ReturnDate: z.string().optional().describe("Our (RotoWire) best guess at the player's return to competition, typically their next game when in season. Expressed in YYYY-MM-DD.")
});

export type NBAInjury = z.infer<typeof NBAInjurySchema>;

export const NBATeamCodeSchema = z.union([
  z.literal("FA"),
  z.literal("ATL"),
  z.literal("BOS"),
  z.literal("BRO"),
  z.literal("CHR"),
  z.literal("CHI"),
  z.literal("CLE"),
  z.literal("DAL"),
  z.literal("DEN"),
  z.literal("DET"),
  z.literal("GS"),
  z.literal("HOU"),
  z.literal("IND"),
  z.literal("LAC"),
  z.literal("LAL"),
  z.literal("MEM"),
  z.literal("MIA"),
  z.literal("MIL"),
  z.literal("MIN"),
  z.literal("NOR"),
  z.literal("NY"),
  z.literal("OKC"),
  z.literal("ORL"),
  z.literal("PHI"),
  z.literal("PHO"),
  z.literal("POR"),
  z.literal("SAC"),
  z.literal("SAN"),
  z.literal("TOR"),
  z.literal("UTA"),
  z.literal("WAS")
]).describe("NBA team codes");

export type NBATeamCode = z.infer<typeof NBATeamCodeSchema>;

export const NBATeamSchema = z.object({
  Id: z.number(),
  Code: NBATeamCodeSchema,
  Name: z.union([
    z.literal("Atlanta Hawks"),
    z.literal("Boston Celtics"),
    z.literal("Brooklyn Nets"),
    z.literal("Charlotte Hornets"),
    z.literal("Chicago Bulls"),
    z.literal("Cleveland Cavaliers"),
    z.literal("Dallas Mavericks"),
    z.literal("Denver Nuggets"),
    z.literal("Golden State Warriors"),
    z.literal("Houston Rockets"),
    z.literal("Indiana Pacers"),
    z.literal("Los Angeles Clippers"),
    z.literal("Los Angeles Lakers"),
    z.literal("Memphis Grizzlies"),
    z.literal("Miami Heat"),
    z.literal("Milwaukee Bucks"),
    z.literal("Minnesota Timberwolves"),
    z.literal("New Orleans Pelicans"),
    z.literal("New York Knicks"),
    z.literal("Oklahoma City Thunder"),
    z.literal("Orlando Magic"),
    z.literal("Philadelphia 76ers"),
    z.literal("Phoenix Suns"),
    z.literal("Portland Trail Blazers"),
    z.literal("Sacramento Kings"),
    z.literal("San Antonio Spurs"),
    z.literal("Toronto Raptors"),
    z.literal("Utah Jazz"),
    z.literal("Washington Wizards"),
    z.literal(null)
  ]),
  Nickname: z.union([
    z.literal("Hawks"),
    z.literal("Celtics"),
    z.literal("Nets"),
    z.literal("Hornets"),
    z.literal("Bulls"),
    z.literal("Cavaliers"),
    z.literal("Mavericks"),
    z.literal("Nuggets"),
    z.literal("Pistons"),
    z.literal("Warriors"),
    z.literal("Rockets"),
    z.literal("Pacers"),
    z.literal("Clippers"),
    z.literal("Lakers"),
    z.literal("Grizzlies"),
    z.literal("Heat"),
    z.literal("Bucks"),
    z.literal("Timberwolves"),
    z.literal("Pelicans"),
    z.literal("Knicks"),
    z.literal("Thunder"),
    z.literal("Magic"),
    z.literal("76ers"),
    z.literal("Suns"),
    z.literal("Trail Blazers"),
    z.literal("Kings"),
    z.literal("Spurs"),
    z.literal("Raptors"),
    z.literal("Jazz"),
    z.literal("Wizards"),
    z.literal(null)
  ])
});

export type NBATeam = z.infer<typeof NBATeamSchema>;

export const NBAPlayerSchema = z.object({
  Id: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Position: z.union([z.literal("G"), z.literal("F"), z.literal("C")]),
  Link: z.string(),
  InjuryStatus: z.union([z.literal("GTD"), z.literal("OUT"), z.literal("OFS")])
});

export type NBAPlayer = z.infer<typeof NBAPlayerSchema>;

export const NBAPlayerInjurySchema = NBAPlayerSchema.extend({
  Injury: NBAInjurySchema
});

export type NBAPlayerInjury = z.infer<typeof NBAPlayerInjurySchema>;

export const NBAUpdatesSchema = UpdatesSchema.extend({
  Priority: NBANewsPrioritySchema,
  Injury: NBAInjurySchema,
  Player: NBAPlayerSchema,
  Team: NBATeamSchema
});

export type NBAUpdates = z.infer<typeof NBAUpdatesSchema>;

export const NBANewsResponseSchema = BaseNewsResponseSchema.extend({
  League: z.literal("NBA"),
  Updates: z.array(NBAUpdatesSchema)
});

export type NBANewsResponse = z.infer<typeof NBANewsResponseSchema>;

export const NBAInjuriesResponseSchema = z.object({
  Players: z.array(NBAPlayerInjurySchema.omit({Link: true}))
});

export type NBAInjuriesResponse = z.infer<typeof NBAInjuriesResponseSchema>;
