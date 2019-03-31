import { IStateRoot } from "../states/StateRoot";
import * as actionTypes from './actionTypes';
import { Client } from "colyseus";
import { Position } from "../models/position";

var actions: IActionTree<IStateRoot, Client> = {
    [actionTypes.TEST]: (state, {sessionId}, payload) => {
        console.log('hey from', actionTypes.TEST, 'action', sessionId, Date.now())
    },
    [actionTypes.MOVE_PLAYER_TO]: ({ statePlayers }, { sessionId }, payload) => {
        //TODO check payload
        var player = statePlayers.players[sessionId]
        statePlayers.players[sessionId].moveTo = new Position(payload.x, 0, payload.z)

        var angle = (Math.atan2(player.moveTo.x - player.position.x, player.moveTo.z - player.position.z) * (180/Math.PI))
        if(angle < 0) {
            angle = angle + 360
        }
        player.rotation = angle
    },
    [actionTypes.JOIN_TEAM]: ({statePlayers}, {sessionId}, payload) => {
        //TODO check payload
        //TODO check if team exist
        //TODO check if team can be joined
        var player = statePlayers.players[sessionId]
        player.team = payload.team.toString()
    },
}

export default actions

interface IActionTree<S, R> {
    [key: string]: Action<S, R>
}

type Action<S, R> = (state: S, client?: R, payload?: any) => any;