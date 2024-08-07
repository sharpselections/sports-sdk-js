import {z} from "zod";
import {
    BaseNewsResponseSchema,
    InjurySideSchema,
    NewsParametersSchema,
    UpdatesSchema
} from "./common";

export const MLBNewsParametersSchema = NewsParametersSchema.extend({
    team: z.string().optional(),
});

export type MLBNewsParameters = z.infer<typeof MLBNewsParametersSchema>;

export const MLBNewsPrioritySchema = z.union([
    z.literal("1").describe("Biggest News"),
    z.literal("2").describe("Top Players"),
    z.literal("3").describe("Regular News"),
    z.literal("4").describe("Minor leagues"),
    z.literal("5").describe("Non-fantasy"),
]);

export const MLBTeamCodeSchema = z.union([
    z.literal("ANA"),
    z.literal("ATL"),
    z.literal("AZ"),
    z.literal("BAL"),
    z.literal("BOS"),
    z.literal("CHI-N"),
    z.literal("CHI-A"),
    z.literal("CIN"),
    z.literal("CLE"),
    z.literal("COL"),
    z.literal("DET"),
    z.literal("HOU"),
    z.literal("KC"),
    z.literal("LA"),
    z.literal("MIA"),
    z.literal("MIL"),
    z.literal("MIN"),
    z.literal("NY-A"),
    z.literal("NY-N"),
    z.literal("OAK"),
    z.literal("PHI"),
    z.literal("PIT"),
    z.literal("SD"),
    z.literal("SF"),
    z.literal("SEA"),
    z.literal("STL"),
    z.literal("TB"),
    z.literal("TEX"),
    z.literal("TOR"),
    z.literal("WSH")
]);

export type MLBTeamCode = z.infer<typeof MLBTeamCodeSchema>;

export const PositionSchema = z.union([
    z.literal("C"),
    z.literal("1B"),
    z.literal("2B"),
    z.literal("SS"),
    z.literal("3B"),
    z.literal("OF"),
    z.literal("DH"),
    z.literal("P")
]);

export type Position = z.infer<typeof PositionSchema>;

export const MLBInjuryStatusSchema = z.union([
    z.literal("Day-To-Day"),
    z.literal("Out"),
    z.literal("7-Day IL"),
    z.literal("10-Day IL"),
    z.literal("15-Day IL"),
    z.literal("60-Day IL"),
    z.literal("Suspension"),
    z.literal("Paternity"),
    z.literal("Bereavement"),
    z.literal("COVID-19")
]);

export const MLBInjuryTypeSchema = z.union([
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
    z.literal("Wrist"),
    z.literal("Opt Out")
]);

export const MLBInjuryDetailSchema = z.union([
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
]);

export const MLBInjurySchema = z.object({
    Status: MLBInjuryStatusSchema,
    Type: MLBInjuryTypeSchema,
    ReturnDate: z.string(), // Written in YYYY-MM-DD
    Detail: MLBInjuryDetailSchema,
    Side: InjurySideSchema
});

export type MLBInjury = z.infer<typeof MLBInjurySchema>;

export const MLBPlayerSchema = z.object({
    Id: z.number(),
    FirstName: z.string(),
    LastName: z.string(),
    Position: PositionSchema,
    LeagueLevel: z.union([
        z.literal("Majors"),
        z.literal("AAA"),
        z.literal("AA"),
        z.literal("A+"),
        z.literal("A"),
        z.literal("Rookie"),
        z.literal("NRI"),
        z.literal("Foreign"),
        z.literal("Free Agent")
    ]),
    Link: z.string(),
    Injury: MLBInjurySchema
});

export type MLBPlayer = z.infer<typeof MLBPlayerSchema>;

export const MLBTeamSchema = z.object({
    Id: z.number(),
    Code: MLBTeamCodeSchema,
    Name: z.union([
        z.literal("Arizona Diamondbacks"),
        z.literal("Atlanta Braves"),
        z.literal("Baltimore Orioles"),
        z.literal("Boston Red Sox"),
        z.literal("Chicago White Sox"),
        z.literal("Chicago Cubs"),
        z.literal("Cincinnati Reds"),
        z.literal("Cleveland Indians"),
        z.literal("Colorado Rockies"),
        z.literal("Detroit Tigers"),
        z.literal("Houston Astros"),
        z.literal("Kansas City Royals"),
        z.literal("Los Angeles Angels"),
        z.literal("Los Angeles Dodgers"),
        z.literal("Miami Marlins"),
        z.literal("Milwaukee Brewers"),
        z.literal("Minnesota Twins"),
        z.literal("New York Yankees"),
        z.literal("New York Mets"),
        z.literal("Oakland Athletics"),
        z.literal("Philadelphia Phillies"),
        z.literal("Pittsburgh Pirates"),
        z.literal("San Diego Padres"),
        z.literal("San Francisco Giants"),
        z.literal("Seattle Mariners"),
        z.literal("St. Louis Cardinals"),
        z.literal("Tampa Bay Rays"),
        z.literal("Texas Rangers"),
        z.literal("Toronto Blue Jays"),
        z.literal("Washington Nationals")
    ]),
    Nickname: z.union([
        z.literal("Diamondbacks"),
        z.literal("Braves"),
        z.literal("Orioles"),
        z.literal("Red Sox"),
        z.literal("White Sox"),
        z.literal("Cubs"),
        z.literal("Reds"),
        z.literal("Indians"),
        z.literal("Rockies"),
        z.literal("Tigers"),
        z.literal("Astros"),
        z.literal("Royals"),
        z.literal("Angels"),
        z.literal("Dodgers"),
        z.literal("Marlins"),
        z.literal("Brewers"),
        z.literal("Twins"),
        z.literal("Yankees"),
        z.literal("Mets"),
        z.literal("Athletics"),
        z.literal("Phillies"),
        z.literal("Pirates"),
        z.literal("Padres"),
        z.literal("Giants"),
        z.literal("Mariners"),
        z.literal("Cardinals"),
        z.literal("Rays"),
        z.literal("Rangers"),
        z.literal("Blue Jays"),
        z.literal("Nationals")
    ])
});

export type MLBTeam = z.infer<typeof MLBTeamSchema>;

export const MLBUpdatesSchema = UpdatesSchema.extend({
    Priority: MLBNewsPrioritySchema,
    IsTransaction: z.boolean(),
    Player: MLBPlayerSchema,
    Team: MLBTeamSchema
});

export type MLBUpdates = z.infer<typeof MLBUpdatesSchema>;

export const MLBNewsResponseSchema = BaseNewsResponseSchema.extend({
    Updates: z.array(MLBUpdatesSchema)
});

export type MLBNewsResponse = z.infer<typeof MLBNewsResponseSchema>;

export const MLBInjuriesResponseSchema = z.object({
    Players: z.array(MLBPlayerSchema.omit({Link: true, LeagueLevel: true}).extend({
        Team: MLBTeamSchema.omit({Name: true, Nickname: true}),
        OnDisabledList: z.boolean().describe("1=Yes, 0= No")
    }))
});

export type MLBInjuriesResponse = z.infer<typeof MLBInjuriesResponseSchema>;
