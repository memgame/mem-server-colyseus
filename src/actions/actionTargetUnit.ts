import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { TARGET_UNIT } from "./actionTypes";
import { Player } from "../models/player";
import { Unit } from "../entities/unit";

/*
{
    "ACTION_TYPE": "TARGET_UNIT",
    "payload": {
        "unitId": "UNIT_IT"
    }
}
*/
export const actionTargetUnit: Action<IStateRoot, Client> = (room, {statePlayers, stateUnits}, {sessionId}, payload) => {
    try {
        if(!payload) throw 'payload is not defined'
        if(!payload.unitId) throw 'payload.playerId is not defined'

        const player: Player = statePlayers.players[sessionId]
        if(!player) throw 'could not find player'
        if(!player.unitId) throw 'no unit id in player'
        const unit = stateUnits.units[player.unitId]
        if(!unit) throw 'could not find unit'
        const target: Unit = stateUnits.units[payload.unitId]
        if(!target) throw 'could not find target'
        if(!target.isAlive) throw 'target is not alive'
        unit.setTarget(target)
    } catch (err) {
        console.error('Error', TARGET_UNIT, err)
    }
}