import { Room, Client } from 'colyseus';
import { State } from './state';
import map from '../../maps/map1.json';


import { calculateTeamPoints } from '../../services/serviceCalculateTeamPoints'
import { calculateCapturePoints } from '../../services/serviceCalculateCapturePoints'

import { movePlayers } from '../../services/serviceMovePlayers'
import * as actionTypes from './actionTypes';
import { Position } from '../../models/position';
import { StateRoot } from '../../states/StateRoot';
import { Player } from '../../models/player';
import { loadMap } from '../../services/serviceLoadMap';

export class Match extends Room<StateRoot> {

    constructor () {
        console.log('----- NEW ROOM -----')
        super();
        this.setState(new StateRoot());
    }

    // When room is initialized
    onInit (options: any) {
        //this.setState(new State(map))
        loadMap(this.state, map)
        this.setPatchRate(1000 / 30);
        this.setSimulationInterval(() => this.update()); 

        //this.clock.setInterval(() => calculateCapturePoints(this.state), 5000)
        //this.clock.setInterval(() => calculateTeamPoints(this.state), 10000)
    }

    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin (options: any, isNew: boolean) {
        console.log('-------------')
        console.log('request join')
        console.log(options)
        return true
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    async onAuth (options: any) {
        console.log('-------------')
        console.log('on auth')
        console.log(options)
        const userData = { name: 'SomeUserName'}
        return userData ? userData : false;
    }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) { 
        console.log('-------------')
        console.log('on join')
        console.log(client.id)
        console.log(options)
        console.log(auth)
        var player = new Player(client.sessionId)
        player.name = auth.name;
        var keysTeams = Object.keys(this.state.stateTeams.teams)
        player.team = keysTeams[Math.floor(Math.random() * keysTeams.length)]
        this.state.statePlayers.addPlayer(player)
    }

    // When a client sends a message
    onMessage (client: Client, message: any) {
        console.log(client.sessionId)
        console.log(message)
        /*
        if(message.ACTION_TYPE == actionTypes.MOVE_PLAYER_TO) {
            var player = this.state.players[client.sessionId]
            this.state.players[client.sessionId].moveTo = new Position(message.payload.x, 0, message.payload.z)

            var angle = (Math.atan2(player.moveTo.x - player.position.x, player.moveTo.z - player.position.z) * (180/Math.PI))
            if(angle < 0) {
                angle = angle + 360
            }
            player.rotation = angle
        }
        */
    }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) {
        this.state.statePlayers.removePlayer(client.sessionId)
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () {
        console.log('----- END ROOM -----')
    }

    update () {
        //movePlayers(this.state, this.clock.deltaTime)
    }
}