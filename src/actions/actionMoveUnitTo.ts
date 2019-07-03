import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Player } from "../models/player";

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
    const player: Player = statePlayers.players[sessionId]
    if(!player) throw 'could not find player'
    if(!player.unitId) throw 'no unit id in player'
    const unit = stateUnits.units[player.unitId]
    if(!unit) throw 'could not find unit'
    if (unit.isAlive) {
        unit.target = null
        unit.setMoveTo(payload.x, 0, payload.z)
    }
}