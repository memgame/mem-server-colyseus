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
export const actionMovePlayerTo: Action<IStateRoot, Client> =  (room, { statePlayers }, { sessionId }, payload) => {
    //TODO check payload
    var player: Player = statePlayers.players[sessionId]
    player.target = null
    player.setMoveTo(payload.x, 0, payload.z)
}