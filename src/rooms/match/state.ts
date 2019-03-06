import { Client } from 'colyseus'
import { IStatePlayers } from '../IStatePlayers'
import { IStateCapturePoints } from '../IStateCapturePoints'
import { IStateTeams } from '../IStateTeams';

import { EntityMap } from "../../types/entityMap"
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
        var player = new Player(client.sessionId)
        player.name = options.name;
        this.players[client.sessionId] = player
        console.log(this.players)
        console.log('added player')
    }

    public removePlayer (client: Client) {
        delete this.players[client.sessionId]
        console.log('removed player')
    }
}