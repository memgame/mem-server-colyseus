import { Action } from "./index";
import { CAST_SKILL } from "./actionTypes";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Player } from "../models/player";
import { Unit } from "../entities/unit";
import { SkillProgress } from "../skills/skillProgress";

/*
{
    "ACTION_TYPE": "CAST_SKILL",
    "payload": {
        "skillSlot": "SKILL_SLOT"
    }
}
*/
export const actionCastSkill: Action<IStateRoot, Client> = (room, {statePlayers,stateUnits}, {sessionId}, payload) => {
    try {
        if(!payload) throw 'payload is not defined'
        if(!payload.skillSlot) throw 'payload.skillSlot is not defined'

        const player: Player = statePlayers.players[sessionId]
        if(!player) throw 'could not find player'
        if(!player.unitId) throw 'no unit id in player'
        const unit: Unit = stateUnits.units[player.unitId]
        if(!unit) throw 'could not find unit'

        const skill: SkillProgress = unit.skillSet[payload.skillSlot]
        if(!skill) throw 'could not find skill slot'

        skill.cast(unit, room.clock.elapsedTime)
    } catch (err) {
        console.error('Error', CAST_SKILL, err)
    }
}