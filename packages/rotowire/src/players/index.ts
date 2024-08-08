import {z} from "zod";

export const PlayersPlayerSchema = z.object({
    Id: z.coerce.string(),
    FirstName: z.string(),
    LastName: z.string(),
    Position: z.string(),
    Link: z.string(),
});

export type PlayersPlayer = z.infer<typeof PlayersPlayerSchema>;

export interface PlayersTeam<T extends PlayersPlayer>{
    Id: string;
    Name: string;
    Players: Array<T>;
}

export interface PlayersTeamDetailed<T extends PlayersPlayer> extends PlayersTeam<T> {
    Code: string;
    Nickname: string;
}

export interface PlayersFreeAgentsTeams<P extends PlayersPlayer, T extends PlayersTeam<P>>{
    FreeAgents: Array<P>;
    Teams: Array<T>;
}