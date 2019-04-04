import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import * as actionTypes from './actionTypes';
import { Client } from "colyseus";

export const actionTest: Action<IStateRoot, Client> = (state, {sessionId}, payload) => {
    console.log('hey from', actionTypes.TEST, 'action', sessionId, Date.now())
}