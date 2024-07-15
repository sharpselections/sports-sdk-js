import { z } from "zod"
import { nullish } from "@sports-sdk/core";

export const NflPlayerInfoSchema = z.object({
  player_id: z.number(),
  player: z.string(),
  team: z.string(),
  team_id: z.number(),
  number: z.number(),
  status: z.string(),
  position: z.string(),
  position_category: z.string(),
  height: z.string(),
  weight: z.number(),
  age: z.string(),
  college: z.string(),
  img: z.string().nullable(),
  all_star: z.any()
});

export type NflPlayerInfo = z.infer<typeof NflPlayerInfoSchema>;

const NflPlayerSeasonStatsSchema = nullish(z.object({
  completions: z.number().describe("The number of times a player completes a Pass."),
  DK_fantasy_points: z.number().describe("Total fantasy points scored by a NFL player based on data from DraftKings"),
  DK_fantasy_points_per_game: z.number().describe("Average fantasy points per game for NFL players on DraftKings"),
  extra_points_attempted: z.number().describe("The number of extra points attempted. An extra point occurs immediately after a touchdown during which the scoring team is allowed to attempt to score one point by kicking the ball through the uprights in the manner of a field goal."),
  extra_points_made: z.number().describe("The number of extra points made. An extra point is awarded after a touchdown when the scoring team has the option to attempt to score an extra point by kicking the ball through the uprights."),
  field_goals_attempted: z.number().describe("The number of field goals that a team has attempted, including both 2-pointers and 3-pointers."),
  field_goals_long: z.number().describe("The longest field goal for the player."),
  field_goals_made: z.number().describe("The number of field goals made by a team. This includes both 2 pointers and 3 pointers."),
  fumbles: z.number().describe("The total number of fumbles by a player. A fumble is any act, other than a Pass - or kick, which results in a loss of player possession."),
  fumbles_lost: z.number().describe("The number of fumbles lost by a player."),
  fumbles_recoveries: z.number().describe("The number of times a team's defense has recovered a fumble. A fumble is when a player loses control of the ball."),
  games_played: z.number().describe("The total number of games played by a NFL football player."),
  inside_20: z.number().describe("Number of punts landed inside the opponents 20 yard line."),
  interceptions: z.number().describe("The number of times a player intercepts a Pass. An interception is when a player catches a Pass - from the opposing team’s offense."),
  kick_return_long: z.number().describe("The longest kick return by a player. A return specialist or kick returner is a player on the special teams unit who specializes in returning kickoffs."),
  kick_return_touchdowns: z.number().describe("The number of touchdowns a player returns from a kickoff. Return specialists or kick returners are members of the special teams unit who specialize in returning kickoffs."),
  kick_return_yards: z.number().describe("The number of yards returned by a player from a kick. A return specialist or kick returner is a player on the special teams unit who specializes in returning kickoffs."),
  kick_returns: z.number().describe("The number of times a player returned a kick. A return specialist or kick returner is a player on the special teams unit who specializes in returning kickoffs."),
  passer_rating: z.number().describe("The passer rating for a player."),
  passing_attempts: z.number().describe("The total number of passing attempts completed by a player."),
  passing_interceptions: z.number().describe("The number of times a NFL player throws an interception. An interception is when a defensive player catches a forward Pass - thrown by the offense resulting in a change of possession."),
  passing_touchdowns: z.number().describe("The number of times a player throws the ball for a successful touchdown, worth six points."),
  passing_yards: z.number().describe("The number of yards gained by a NFL football player on completed passes."),
  punt_return_long: z.number().describe("The longest punt return by a player. A return specialist or kick returner is a player on the special teams unit who specializes in returning punts."),
  punt_return_touchdowns: z.number().describe("The number of punt returns that were returned for a touchdown."),
  punt_return_yards: z.number().describe("The total number of yards returned from punts by the player."),
  punt_returns: z.number().describe("The number of punt returns by a player. A punt is a kick performed by dropping the ball from the hands and then kicking the ball before it hits the ground"),
  punting_yards: z.number().describe("The total number of punting yards from a player."),
  punts: z.number().describe("The number of punts by a punter. A punt is a kick performed by dropping the ball from the hands and then kicking the ball before it hits the ground."),
  punts_long: z.number().describe("The longest punt for the player."),
  receiving_long: z.number().describe("The longest reception by a player."),
  receiving_touchdowns: z.number().describe("The number of receiving touchdowns caught by a player."),
  receiving_yards: z.number().describe("The total number of receiving yards by a player."),
  receptions: z.number().describe("The number of receptions made by a player."),
  rushing_attempts: z.number().describe("The number of rushing attempts by a player."),
  rushing_long: z.number().describe("The longest rushing play from the player."),
  rushing_touchdowns: z.number().describe("The number of rushing touchdowns from the player."),
  rushing_yards: z.number().describe("The total number of yards gained by a player from rushing."),
  sacks: z.number().describe("The number of sacks by a defensive player. A sack occurs when the quarterback (or another offensive player acting as a passer) is tackled behind the line of scrimmage before he can throw a forward pass, when the quarterback is tackled behind the line of scrimmage in the 'pocket' and his intent is unclear, or when a passer runs out of bounds behind the line of scrimmage due to defensive pressure."),
  tackles: z.number().describe("The number of tackles made by a player."),
  two_point_conversion_pass_attempts: z.number().describe("The number of times a player attempts to Pass - for a 2 point conversion. A two point conversion is an offensive play from the defense’s two-yard line to try to earn two additional points after scoring a touchdown."),
  two_point_conversion_pass_completions: z.number().describe("The number of times a player completes a Pass - for a 2 point conversion. A two point conversion occurs after scoring a touchdown and is a play run from the defense’s two-yard line to try to earn two additional points. The team earns the points if a runner carries the ball across the goal line or catches the ball within the end zone."),
  two_point_conversion_reception_succeeded: z.number().describe("The number of times a NFL Football player receives a Pass - for a two point conversion. A two point conversion occurs after scoring a touchdown. An offense can opt to run one play from the defense’s two-yard line to try to earn two additional points. The team earns the points if a runner carries the ball across the goal line or catches the ball within the end zone, just like scoring a touchdown."),
  two_point_conversion_rush_attempts: z.number().describe("The number of times a player attempts to Rush - for 2 points. A two point conversion occurs after scoring a touchdown in American Football."),
  two_point_conversion_rush_succeeded: z.number().describe("The number of times a player succeeds in rushing for a 2 point conversion. A two point conversion occurs after scoring a touchdown and if a runner carries the ball across the goal line or catches the ball within the end zone, just like scoring a touchdown.")
}));

// Main player schema
export const NflPlayerStatsSchema = z.object({
  player: z.string().describe("The full name of a NFL Football player"),
  player_id: z.string().describe("Unique identifier for each NFL Football Player"),
  postseason: NflPlayerSeasonStatsSchema.describe("Statistic representing a NFL player's performance in the postseason (playoff games)").nullable(),
  regular_season: NflPlayerSeasonStatsSchema.describe("This field represents the regular season stats of a NFL Football Player.").nullable(),
  team: z.string().describe("The team name of a NFL football player."),
  team_id: z.string().describe("Unique identifier for the team in the NFL Football Player Stats database.")
});

export type NflPlayerStats = z.infer<typeof NflPlayerStatsSchema>;

// Common fields schema for regular season
const NflTeamSeasonStatsSchema = z.object({
  ties: z.number().nullable(),
  wins: z.number().nullable(),
  sacks: z.number().nullable(),
  losses: z.number().nullable(),
  points: z.number().nullable(),
  safeties: z.number().nullable(),
  penalties: z.number().nullable(),
  turnovers: z.number().nullable(),
  first_downs: z.number().nullable(),
  total_plays: z.number().nullable(),
  total_yards: z.number().nullable(),
  games_played: z.number().nullable(),
  blocked_kicks: z.number().nullable(),
  blocked_punts: z.number().nullable(),
  kicks_blocked: z.number().nullable(),
  passing_yards: z.number().nullable(),
  penalty_yards: z.number().nullable(),
  punts_blocked: z.number().nullable(),
  rushing_yards: z.number().nullable(),
  DK_fantasy_points: z.number().nullable(),
  defense_touchdowns: z.number().nullable(),
  defense_interceptions: z.number().nullable(),
  kick_return_touchdowns: z.number().nullable(),
  punt_return_touchdowns: z.number().nullable(),
  blocked_kick_touchdowns: z.number().nullable(),
  blocked_punt_touchdowns: z.number().nullable(),
  interception_touchdowns: z.number().nullable(),
  fumble_return_touchdowns: z.number().nullable(),
  defense_fumble_recoveries: z.number().nullable(),
  field_goal_return_touchdowns: z.number().nullable(),
  two_point_conversion_returns: z.number().nullable(),
  two_point_conversion_attempts: z.number().nullable(),
  two_point_conversion_succeeded: z.number().nullable(),
  points_against_defense_special_teams: z.number().nullable(),
  DK_fantasy_points_per_game: z.number().nullable()
}).partial();

// Main team schema
export const NflTeamStatsSchema = z.object({
  bye: z.union([z.number(), z.string()]).describe("The week in the NFL schedule that a team does not play a game."),
  regular_season: NflTeamSeasonStatsSchema.describe("This field represents the regular season stats of a NFL Football Team."),
  postseason: NflTeamSeasonStatsSchema.describe("Statistic representing a NFL player's performance in the postseason (playoff games)").nullable(),
  team: z.string().describe("Team Name and Identifier for NFL Football Teams."),
  team_id: z.number().describe("The team ID is a numerical identifier for a NFL Football team.")
});

export type NflTeamStats = z.infer<typeof NflTeamStatsSchema>;

export const NflTeamInfoSchema = z.object({
  team_id: z.number(),
  team: z.string(),
  abbrv: z.string(),
  mascot: z.string(),
  conf: z.string(),
  location: z.string(),
  img: z.string(),
  city: z.string(),
  state: z.string(),
  arena: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  field: z.string(),
  postal_code: z.string(),
  dome: z.number()
});

export type NflTeamInfo = z.infer<typeof NflTeamInfoSchema>;

export const NflScheduleSchema = z.object({
  away_team: z.string(),
  home_team: z.string(),
  away_team_ID: z.number(),
  home_team_ID: z.number(),
  game_ID: z.string(),
  game_time: z.string(),
  season_type: z.string(),
  event_name: z.string().nullable(),
  round: z.number().nullable(),
  season: z.string(),
  week: z.number(),
  status: z.string(),
  city: z.string(),
  state: z.string(),
  arena: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  field: z.string(),
  postal_code: z.string(),
  dome: z.number()
});

export type NflSchedule = z.infer<typeof NflScheduleSchema>;