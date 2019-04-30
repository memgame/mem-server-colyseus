import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import * as actionTypes from './actionTypes';
import { Client } from "colyseus";

/*
{
    "ACTION_TYPE": "TEST",
    "payload": {}
}
*/
export const actionTest: Action<IStateRoot, Client> = (room, state, {sessionId}, payload) => {
    console.log('hey from', actionTypes.TEST, 'action', sessionId, Date.now())
}