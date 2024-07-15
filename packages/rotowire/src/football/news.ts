import {z} from "zod";
import {BaseNewsResponseSchema, UpdatesSchema} from "../common/news";

const NewsPrioritySchema = z.union([
    z.literal(1).describe("Biggest News"),
    z.literal(2).describe("Top Players"),
    z.literal(3).describe("Regular News"),
    z.literal(4).describe("IDP or skill position depth"),
    z.literal(5).describe("O-Line/Non-Fantasy")
]);

const FootballInjuryStatusSchema = z.union([
    z.literal("QUESTIONABLE"),
    z.literal("DOUBTFUL"),
    z.literal("OUT"),
    z.literal("INACTIVE"),
    z.literal("PUP-R"),
    z.literal("PUP-P"),
    z.literal("IR-R"),
    z.literal("IR"),
    z.literal("RESERVE-DNR"),
    z.literal("NFI-R"),
    z.literal("NFI-A"),
    z.literal("RESERVE-CEL"),
    z.literal("RESERVE-SUS"),
    z.literal("RESERVE-RET"),
    z.literal("RESERVE-EX"),
    z.literal("RESERVE-COVID-19")
]).describe("Injury status");

const FootballInjuryTypeSchema = z.union([
    z.literal("Abdomen"),
    z.literal("Achilles"),
    z.literal("Ankle"),
    z.literal("Appendix"),
    z.literal("Arm"),
    z.literal("Back"),
    z.literal("Biceps"),
    z.literal("Calf"),
    z.literal("Chest"),
    z.literal("Coach's Decision"),
    z.literal("Collarbone"),
    z.literal("Concussion"),
    z.literal("Contract Dispute"),
    z.literal("Elbow"),
    z.literal("Eye"),
    z.literal("Finger"),
    z.literal("Foot"),
    z.literal("Forearm"),
    z.literal("General Soreness"),
    z.literal("Groin Hamstring"),
    z.literal("Hand"),
    z.literal("Head"),
    z.literal("Heel"),
    z.literal("Hip"),
    z.literal("Hip - Labrum"),
    z.literal("Illness"),
    z.literal("Jaw"),
    z.literal("Knee"),
    z.literal("Knee - ACL"),
    z.literal("Knee - ACL + MCL"),
    z.literal("Knee - MCL"),
    z.literal("Knee - Meniscus"),
    z.literal("Knee - PCL"),
    z.literal("Kneecap"),
    z.literal("Leg"),
    z.literal("Lower Back"),
    z.literal("Lower Leg"),
    z.literal("Migraine"),
    z.literal("Mouth"),
    z.literal("Neck"),
    z.literal("Nose"),
    z.literal("Oblique"),
    z.literal("Orbital"),
    z.literal("Paternity"),
    z.literal("Pectoral"),
    z.literal("Pelvis"),
    z.literal("Personal"),
    z.literal("Pinched Nerve"),
    z.literal("Quadriceps"),
    z.literal("Rest"),
    z.literal("Ribs"),
    z.literal("Shin"),
    z.literal("Shoulder"),
    z.literal("Shoulder - AC Joint"),
    z.literal("Shoulder - Labrum"),
    z.literal("Spine"),
    z.literal("Sports Hernia"),
    z.literal("Stomach"),
    z.literal("Suspension"),
    z.literal("Tailbone"),
    z.literal("Teeth"),
    z.literal("Thigh"),
    z.literal("Thumb"),
    z.literal("Toe"),
    z.literal("Torso"),
    z.literal("Triceps"),
    z.literal("Undisclosed"),
    z.literal("Upper Body"),
    z.literal("Upper Leg"),
    z.literal("Wrist"),
    z.literal("Opt Out")
]).describe("Injury types");

const FootballInjuryDetailSchema = z.union([
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

const InjurySideSchema = z.union([
    z.literal("Not Specified"),
    z.literal("Left"),
    z.literal("Right")
]).describe("Injury side");

const FootballInjurySchema = z.object({
    Status: FootballInjuryStatusSchema,
    Type: FootballInjuryTypeSchema,
    Detail: FootballInjuryDetailSchema,
    Location: z.string().nullish(),
    Side: InjurySideSchema,
    ReturnDate: z.string().optional().describe("Return date in YYYY-MM-DD format")
});

const FootballPlayerSchema = z.object({
    Id: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Position: z.union([
        z.literal("QB"),
        z.literal("RB"),
        z.literal("FB"),
        z.literal("WR"),
        z.literal("TE"),
        z.literal("OT"),
        z.literal("OG"),
        z.literal("C"),
        z.literal("DT"),
        z.literal("DE"),
        z.literal("LB"),
        z.literal("CB"),
        z.literal("DB"),
        z.literal("S"),
        z.literal("K"),
        z.literal("P")
    ]).describe("Player position"),
    Link: z.string()
});

const NFLTeamSchema = z.object({
    Id: z.number(),
    Code: z.union([
        z.literal("ARZ"),
        z.literal("ATL"),
        z.literal("BAL"),
        z.literal("BUF"),
        z.literal("CAR"),
        z.literal("CHI"),
        z.literal("CIN"),
        z.literal("CLE"),
        z.literal("DAL"),
        z.literal("DEN"),
        z.literal("DET"),
        z.literal("GB"),
        z.literal("HOU"),
        z.literal("IND"),
        z.literal("JAC"),
        z.literal("KC"),
        z.literal("LA"),
        z.literal("LAC"),
        z.literal("MIA"),
        z.literal("MIN"),
        z.literal("NE"),
        z.literal("NO"),
        z.literal("NYG"),
        z.literal("NYJ"),
        z.literal("LV"),
        z.literal("PHI"),
        z.literal("PIT"),
        z.literal("SEA"),
        z.literal("SF"),
        z.literal("TB"),
        z.literal("TEN"),
        z.literal("WAS")
    ]).describe("NFL team code"),
    Name: z.string(),
    Nickname: z.string()
});

const NCAAFTeamSchema = z.object({
    Id: z.string(),
    Code: z.string().describe("NCAAF team code"),
    Name: z.string(),
    Nickname: z.string()
});

const UpdatesSchemaGeneric = UpdatesSchema.extend({
    Priority: NewsPrioritySchema,
    IsTransaction: z.boolean().describe("0=no, 1=yes"),
    Injury: FootballInjurySchema,
    Player: FootballPlayerSchema,
    Team: z.union([NFLTeamSchema, NCAAFTeamSchema])
});

const NewsResponseSchemaGeneric = BaseNewsResponseSchema.extend({
    League: z.string(),
    Updates: z.array(UpdatesSchemaGeneric)
});

const NFLNewsResponseSchema = NewsResponseSchemaGeneric.extend({
    League: z.literal("NFL")
});

const NCAAFNewsResponseSchema = NewsResponseSchemaGeneric.extend({
    League: z.literal("NCAAF")
});

const FootballInjuryResponseSchema = z.object({
    Players: z.array(FootballPlayerSchema.omit({Link: true}).extend({
        Injury: FootballInjurySchema
    }))
});

export type NFLNewsResponse = z.infer<typeof NFLNewsResponseSchema>;
export type NFLUpdates = z.infer<typeof UpdatesSchemaGeneric>;
export type NFLTeam = z.infer<typeof NFLTeamSchema>;
export type NFLPlayer = z.infer<typeof FootballPlayerSchema>;
export type NFLInjury = z.infer<typeof FootballInjurySchema>;
export type NFLInjuriesResponse = z.infer<typeof FootballInjuryResponseSchema>;

export type NCAAFNewsResponse = z.infer<typeof NCAAFNewsResponseSchema>;
export type NCAAFUpdates = z.infer<typeof UpdatesSchemaGeneric>;
export type NCAAFTeam = z.infer<typeof NCAAFTeamSchema>;
export type NCAAFPlayer = z.infer<typeof FootballPlayerSchema>;
export type NCAAFInjury = z.infer<typeof FootballInjurySchema>;
export type NCAAFInjuriesResponse = z.infer<typeof FootballInjuryResponseSchema>;
