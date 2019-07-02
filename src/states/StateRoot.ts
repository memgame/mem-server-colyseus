import { Schema, type } from "@colyseus/schema"
import { IStateCounter, StateCounter } from './StateCounter'
import { IStatePlayers, StatePlayers } from "./StatePlayers"
import { IStateTeams, StateTeams } from "./StateTeams"
import { IStateCapturePoints, StateCapturePoints } from "./StateCapturePoints"
import { StateEntities, IStateEntities } from "./StateEntities";

export class StateRoot extends Schema implements IStateRoot {

    @type(StateEntities)
    stateEntities: IStateEntities = new StateEntities()

    @type(StatePlayers)
    statePlayers: IStatePlayers = new StatePlayers()

    @type(StateTeams)
    stateTeams: IStateTeams = new StateTeams()

    @type(StateCapturePoints)
    stateCapturePoints: IStateCapturePoints = new StateCapturePoints()

    @type(StateCounter)
    stateCounter: IStateCounter = new StateCounter()

}


export interface IStateRoot extends Schema {
    stateEntities: IStateEntities
    stateCounter: IStateCounter
    statePlayers: IStatePlayers
    stateTeams: IStateTeams
    stateCapturePoints: IStateCapturePoints
}