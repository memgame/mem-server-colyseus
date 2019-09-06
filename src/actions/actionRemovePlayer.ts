import { Action } from "../actions/index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";

export const actionRemovePlayer: Action<IStateRoot, Client> = (room, state, client, payload) => {
    //TODO make better server validation
    if (client != null) return

    this.state.statePlayers.removePlayer(payload.sessionId)
}