import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";

export const actionTargetPlayer: Action<IStateRoot, Client> = ({statePlayers}, {sessionId}, payload) => {
    var player = statePlayers.players[sessionId]
    var target = statePlayers.players[payload.playerId]
    player.target = target
}