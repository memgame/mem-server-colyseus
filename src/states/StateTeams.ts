import { Team } from "../models/team";
import { Schema, MapSchema, type } from "@colyseus/schema";

export class StateTeams extends Schema implements IStateTeams {
    @type({ map: Team })
    teams: MapSchema<Team> = new MapSchema<Team>();
    
    public addTeam (team: Team): void {
        this.teams[team.id] = team
        console.log('added team')
    }

    public removeTeam (teamId: string): void {
        delete this.teams[teamId]
        console.log('removed team')
    }
}

export interface IStateTeams extends Schema {
    teams: MapSchema<Team>

    addTeam(team: Team): void
    removeTeam(teamId: string): void
}