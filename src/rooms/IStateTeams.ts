import { EntityMap } from "../types/entityMap"
import { Team } from "../models/team";

export interface IStateTeams {
    teams: EntityMap<Team>
}