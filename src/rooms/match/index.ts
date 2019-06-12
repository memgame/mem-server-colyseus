import { Room, Client } from 'colyseus';
import map from '../../maps/map1.json';


import { systemCalculateTeamPoints } from '../../systems/systemCalculateTeamPoints'
import { systemCalculateCapturePoints } from '../../systems/systemCalculateCapturePoints'

import { systemMovePlayers } from '../../systems/systemMovePlayers'
import actions from '../../actions'
import { StateRoot, IStateRoot } from '../../states/StateRoot';
import { Player } from '../../models/player';
import { systemLoadMap } from '../../systems/systemLoadMap';
import { systemAutoAttackPlayers } from '../../systems/systemAutoAttackPlayers';
import { systemRotatePlayersToTarget } from '../../systems/systemRotatePlayers';
import { systemRespawnPlayers } from '../../systems/systemRespawnPlayers';
import { systemHealthRegenerationPlayers } from '../../systems/systemHealthRegenerationPlayers';
import { systemEnergyRegenerationPlayers } from '../../systems/systemEnergyRegenerationPlayers';
import { systemTargetCheckPlayer } from '../../systems/systemTargetCheckPlayers';

export class Match extends Room<IStateRoot> {

    constructor () {
        console.log('----- NEW ROOM -----')
        super();
        this.setState(new StateRoot());
    }

    // When room is initialized
    onInit (options: any) {
        //this.setState(new State(map))
        systemLoadMap(this.state, map)
        this.setPatchRate(1000 / 30);
        this.setSimulationInterval(() => this.update()); 

        this.clock.setInterval(() => systemCalculateCapturePoints(this.state.stateCapturePoints, this.state.statePlayers), 5000)
        this.clock.setInterval(() => systemCalculateTeamPoints(this.state.stateTeams, this.state.stateCapturePoints), 10000)
        this.clock.setInterval(() => systemRespawnPlayers(this.state.statePlayers), 10000)
        this.clock.setInterval(() => systemHealthRegenerationPlayers(this.state.statePlayers), 1000)
        this.clock.setInterval(() => systemEnergyRegenerationPlayers(this.state.statePlayers), 1000)
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
        if (actions[message.ACTION_TYPE]) {
            actions[message.ACTION_TYPE](this, this.state, client, message.payload)
        } else {
            console.log('There is no action with this action type:', message.ACTION_TYPE)
        }
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
        systemTargetCheckPlayer(this.state.statePlayers)
        systemRotatePlayersToTarget(this.state.statePlayers)
        systemMovePlayers(this.state.statePlayers, this.clock.deltaTime)
        systemAutoAttackPlayers(this.state.statePlayers, this.clock.elapsedTime, this)
    }
}