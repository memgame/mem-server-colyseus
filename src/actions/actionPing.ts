import { Action } from "./index";
import { IStateRoot } from "../states/StateRoot";
import { Client } from "colyseus";
import { PING } from "./actionTypes";

/*
{
    "ACTION_TYPE": "PING",
    "payload": {
        "pingType": "warning",
        "x": 130,
        "z": 125
    }
}
*/
export const actionPing: Action<IStateRoot, Client> = (room, state, client, payload) => {
    try {
        if(!payload) throw 'payload is not defined'
        if(!payload.pingType) throw 'payload.pingType is not defined'
        if(!payload.x) throw 'payload.x is not defined'
        if(!payload.z) throw 'payload.z is not defined'

        //TODO check if user is spam pinging

        //TODO only send pings to team members
        room.broadcast({
            ACTION_TYPE: PING,
            payload: {
                pingType: payload.pingType,
                x: payload.x,
                z: payload.z
            }
        })
    } catch (err) {
        console.error('Error', PING, err)
    }
}