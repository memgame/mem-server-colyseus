import { Schema, type } from "@colyseus/schema"
import { IStateCounter, StateCounter } from './StateCounter'
import { IStatePlayers, StatePlayers } from "./StatePlayers"
import { IStateTeams, StateTeams } from "./StateTeams"
import { IStateCapturePoints, StateCapturePoints } from "./StateCapturePoints"
import { StateUnits, IStateUnits } from "./StateUnits";

export class StateRoot extends Schema implements IStateRoot {
    @type(StateUnits) public stateUnits: IStateUnits = new StateUnits()
    @type(StatePlayers) public statePlayers: IStatePlayers = new StatePlayers()
    @type(StateTeams) public stateTeams: IStateTeams = new StateTeams()
    @type(StateCapturePoints) public stateCapturePoints: IStateCapturePoints = new StateCapturePoints()
    @type(StateCounter) public stateCounter: IStateCounter = new StateCounter()
}


export interface IStateRoot extends Schema {
    stateCounter: IStateCounter
    statePlayers: IStatePlayers
    stateTeams: IStateTeams
    stateCapturePoints: IStateCapturePoints
}