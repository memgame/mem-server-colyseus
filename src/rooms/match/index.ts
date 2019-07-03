import { Room, Client } from 'colyseus';
import map from '../../data/maps/map1.json';
import weapons from '../../data/weapons.json'


import { systemCalculateTeamPoints } from '../../systems/systemCalculateTeamPoints'
import { systemCalculateCapturePoints } from '../../systems/systemCalculateCapturePoints'

import actions from '../../actions'
import { StateRoot, IStateRoot } from '../../states/StateRoot';
import { Player } from '../../models/player';
import { systemLoadMap } from '../../systems/systemLoadMap';
import { WeaponType, Weapon, WeaponSlot, CombatStyle } from '../../models/weapon';
import { systemUnitsMovement } from '../../systems/systemUnitsMovement';
import { systemUnitsTargetCheck } from '../../systems/systemUnitsTargetCheck';
import { systemUnitsRotateToTarget } from '../../systems/systemUnitsRotate';
import { systemUnitsAutoAttack } from '../../systems/systemUnitsAutoAttack';
import { systemUnitsRespawn } from '../../systems/systemUnitsRespawn';
import { systemUnitsHealthRegeneration } from '../../systems/systemUnitsHealthRegeneration';
import { systemUnitsEnergyRegeneration } from '../../systems/systemUnitsEnergyRegeneration';
import { Unit } from '../../entities/unit';

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

        this.clock.setInterval(() => systemUnitsRespawn(this.state.stateUnits.units), 10000)
        this.clock.setInterval(() => systemUnitsHealthRegeneration(this.state.stateUnits.units), 1000)
        this.clock.setInterval(() => systemUnitsEnergyRegeneration(this.state.stateUnits.units), 1000)
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
        const playerName = auth.name
        const unit = Unit.generate()
        const keysTeams = Object.keys(this.state.stateTeams.teams)
        const keyTeam = keysTeams[Math.floor(Math.random() * keysTeams.length)]
        unit.team = keyTeam
        unit.name = playerName
        this.state.stateUnits.addUnit(unit)

        var player = new Player(client.sessionId)
        player.name = auth.name
        player.unitId = unit.id
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
        systemUnitsTargetCheck(this.state.stateUnits.units)
        systemUnitsRotateToTarget(this.state.stateUnits.units)
        systemUnitsMovement(this.state.stateUnits.units, this.clock.deltaTime)
        systemUnitsAutoAttack(this.state.stateUnits.units, this.clock.elapsedTime, this)
    }
}