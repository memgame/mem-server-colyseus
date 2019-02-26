import { EntityMap } from "colyseus";
import { Team } from "../models/team";

export interface IStateTeams {
    teams: EntityMap<Team>
}