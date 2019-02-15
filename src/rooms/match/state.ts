import { EntityMap, Client } from 'colyseus'
import { IStatePlayers } from '../IStatePlayers'
import { IStateCapturePoints } from '../IStateCapturePoints';

import { movePlayers } from '../../services/serviceMovePlayers'
import { calculateCapturePoints } from '../../services/serviceCalculateCapturePoints'

import { Player } from '../../models/player'
import { CapturePoint } from '../../models/capturePoint'

export class State implements IStatePlayers, IStateCapturePoints {
    public capturePoints: EntityMap<CapturePoint> = {};
    public players: EntityMap<Player> = {};
    
    constructor() {
        
    }

    public addPlayer (client: Client, options: any) {
        var player = new Player(client.id)
        player.name = options.name;
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