import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Position } from "../models/position";
import { Player } from "../models/player";

/*
{
    "ACTION_TYPE": "MOVE_PLAYER_TO",
    "payload": {
        "x": 120,
        "z": 130
    }
}
*/
export const actionMovePlayerTo: Action<IStateRoot, Client> =  ({ statePlayers }, { sessionId }, payload) => {
    //TODO check payload
    var player: Player = statePlayers.players[sessionId]
    player.target = null
    statePlayers.players[sessionId].moveTo = new Position(payload.x, 0, payload.z)

    var angle = (Math.atan2(player.moveTo.x - player.position.x, player.moveTo.z - player.position.z) * (180/Math.PI))
    if(angle < 0) {
        angle = angle + 360
    }
    player.rotation = angle
}