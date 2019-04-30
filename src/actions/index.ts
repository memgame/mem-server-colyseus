import { IStateRoot } from "../states/StateRoot";
import * as actionTypes from './actionTypes';
import { Client, Room } from "colyseus";
import { actionTest } from "./actionTest";
import { actionMovePlayerTo } from "./actionMovePlayerTo";
import { actionJoinTeam } from "./actionJoinTeam";
import { actionTargetPlayer } from "./actionTargetPlayer";
import { actionPing } from "./actionPing";

var actions: IActionTree<IStateRoot, Client> = {
    [actionTypes.TEST]: actionTest,
    [actionTypes.MOVE_PLAYER_TO]: actionMovePlayerTo,
    [actionTypes.JOIN_TEAM]: actionJoinTeam,
    [actionTypes.TARGET_PLAYER]: actionTargetPlayer,
    [actionTypes.PING]: actionPing
}
export default actions

export interface IActionTree<S, R> {
    [key: string]: Action<S, R>
}

export type Action<S, R> = (room: Room<S>, state: S, client?: R, payload?: any) => any;