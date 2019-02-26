import { EntityMap, Client } from 'colyseus'
import { IStatePlayers } from '../IStatePlayers'
import { IStateCapturePoints } from '../IStateCapturePoints'
import { IStateTeams } from '../IStateTeams';

import { movePlayers } from '../../services/serviceMovePlayers'
import { calculateCapturePoints } from '../../services/serviceCalculateCapturePoints'

import { Player } from '../../models/player'
import { CapturePoint } from '../../models/capturePoint'
import { Team } from '../../models/team';

export class State implements IStatePlayers, IStateCapturePoints, IStateTeams {
    
    public capturePoints: EntityMap<CapturePoint> = {}
    public players: EntityMap<Player> = {}
    public teams: EntityMap<Team> = {}
    
    constructor() {
        
    }

    public addPlayer (client: Client, options: any) {
        var player = new Player(client.id)
        player.name = options.name;
        player.moveSpeed = 300;
        this.players[client.id] = player
        console.log(this.players)
        console.log('added player')
    }

    public removePlayer (client: Client) {
        delete this.players[client.id]
        console.log('removed player')
    }

    public calculateState(deltaTime: number) {
        movePlayers(this, deltaTime)
        calculateCapturePoints(this)
    }
}