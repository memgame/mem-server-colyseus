import { IStateRoot } from "../states/StateRoot";
import * as actionTypes from './actionTypes';
import { Client, Room } from "colyseus";
import { actionTest } from "./actionTest";
import { actionMoveUnitTo } from "./actionMoveUnitTo";
import { actionJoinTeam } from "./actionJoinTeam";
import { actionTargetUnit } from "./actionTargetUnit";
import { actionPing } from "./actionPing";
import { actionAddPlayer } from "./actionAddPlayer"
import { actionRemovePlayer } from "./actionRemovePlayer";

var actions: IActionTree<IStateRoot, Client> = {
    [actionTypes.TEST]: actionTest,
    [actionTypes.MOVE_UNIT_TO]: actionMoveUnitTo,
    [actionTypes.JOIN_TEAM]: actionJoinTeam,
    [actionTypes.TARGET_UNIT]: actionTargetUnit,
    [actionTypes.PING]: actionPing,
    [actionTypes.ADD_PLAYER]: actionAddPlayer,
    [actionTypes.REMOVE_PLAYER]: actionRemovePlayer,

}
export default actions

export interface IActionTree<S, R> {
    [key: string]: Action<S, R>
}

export type Action<S, R> = (room: Room<S>, state: S, client?: R, payload?: any) => any;