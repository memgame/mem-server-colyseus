import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";

export const actionJoinTeam: Action<IStateRoot, Client> = ({statePlayers}, {sessionId}, payload) => {
    //TODO check payload
    //TODO check if team exist
    //TODO check if team can be joined
    var player = statePlayers.players[sessionId]
    player.team = payload.team.toString()
    console.log(player.isAlive)
    console.log(player.toJSON())
}