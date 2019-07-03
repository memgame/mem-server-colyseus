import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";

/*
{
    "ACTION_TYPE": "JOIN_TEAM",
    "payload": {
        "teamId": "TEAM_ID"
    }
}
*/
export const actionJoinTeam: Action<IStateRoot, Client> = (room, {statePlayers}, {sessionId}, payload) => {
    //TODO check payload
    //TODO check if team exist
    //TODO check if team can be joined
    //TODO change all relate entites from player to new team
    var player = statePlayers.players[sessionId]
    console.log(player.team)
    player.team = payload.teamId.toString()
    console.log(player.team)
}