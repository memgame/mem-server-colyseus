import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";

/*
{
    "ACTION_TYPE": "CAST_SKILL",
    "payload": {
        "skillId": "SKILL_ID"
    }
}
*/
export const actionCastSkill: Action<IStateRoot, Client> = (room, {statePlayers}, {sessionId}, payload) => {
    //TODO check payload
    console.log('TODO: CAST SKILL')
}