import { Schema, type } from "@colyseus/schema"
import { IStateCounter, StateCounter } from './StateCounter'
import { IStatePlayers, StatePlayers } from "./StatePlayers"
import { IStateTeams, StateTeams } from "./StateTeams"
import { IStateCapturePoints, StateCapturePoints } from "./StateCapturePoints"

export class StateRoot extends Schema implements IStateRoot {

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
    stateCounter: IStateCounter
    statePlayers: IStatePlayers
    stateTeams: IStateTeams
    stateCapturePoints: IStateCapturePoints
}