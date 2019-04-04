import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { Position } from "../models/position";

export const actionMovePlayerTo: Action<IStateRoot, Client> =  ({ statePlayers }, { sessionId }, payload) => {
    //TODO check payload
    var player = statePlayers.players[sessionId]
    statePlayers.players[sessionId].moveTo = new Position(payload.x, 0, payload.z)

    var angle = (Math.atan2(player.moveTo.x - player.position.x, player.moveTo.z - player.position.z) * (180/Math.PI))
    if(angle < 0) {
        angle = angle + 360
    }
    player.rotation = angle
}