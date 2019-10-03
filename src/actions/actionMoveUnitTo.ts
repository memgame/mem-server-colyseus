import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Player } from "../models/player";
import { Unit } from "../entities/unit";

/*
{
    "ACTION_TYPE": "MOVE_UNIT_TO",
    "payload": {
        "x": 120,
        "z": 130
    }
}
*/
export const actionMoveUnitTo: Action<IStateRoot, Client> =  (room, { statePlayers, stateUnits }, { sessionId }, payload) => {
    //TODO check payload
    if(!payload) throw 'payload is not defined'
    if(!payload.x) throw 'payload.x is not defined'
    if(!payload.z) throw 'payload.z is not defined'

    const player: Player = statePlayers.players[sessionId]
    if(!player) throw 'could not find player'
    if(!player.unitId) throw 'no unit id in player'
    const unit: Unit = stateUnits.units[player.unitId]
    if(!unit) throw 'could not find unit'
    if (unit.isAlive) {
        unit.target = null
        unit.setMoveTo(payload.x, 0, payload.z)
    }
}