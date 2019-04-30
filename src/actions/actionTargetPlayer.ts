import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { TARGET_PLAYER } from "./actionTypes";

/*
{
    "ACTION_TYPE": "TARGET_PLAYER",
    "payload": {
        "playerId": "PLAYER_ID"
    }
}
*/
export const actionTargetPlayer: Action<IStateRoot, Client> = ({statePlayers}, {sessionId}, payload) => {
    try {
        if(!payload) throw 'payload is not defined'
        if(!payload.playerId) throw 'payload.playerId is not defined'

        var target = statePlayers.players[payload.playerId]

        if(!target) throw 'could not find target'

        var player = statePlayers.players[sessionId]

        if(!player) throw 'could not find player'

        player.setTarget(target)
    } catch (err) {
        console.error('Error', TARGET_PLAYER, err)
    }
}