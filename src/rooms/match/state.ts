import { Client } from 'colyseus'
import { IStatePlayers } from '../IStatePlayers'
import { IStateCapturePoints } from '../IStateCapturePoints'
import { IStateTeams } from '../IStateTeams';

import { EntityMap } from "../../types/entityMap"
import { Player } from '../../models/player'
import { CapturePoint } from '../../models/capturePoint'
import { Team } from '../../models/team';
import { loadMap } from '../../services/serviceLoadMap';

export class State implements IStatePlayers, IStateTeams, IStateCapturePoints {
    
    public players: EntityMap<Player> = {}
    public teams: EntityMap<Team> = {}
    public capturePoints: EntityMap<CapturePoint> = {}
    
    constructor(map: any) {
        loadMap(this, map)
    }

    public addPlayer (client: Client, options: any) {
        var player = new Player(client.sessionId)
        player.name = options.name;
        var keysTeams = Object.keys(this.teams)
        player.team = keysTeams[Math.floor(Math.random() * keysTeams.length)]
        this.players[client.sessionId] = player

        console.log(this.players)
        console.log('added player')
    }

    public removePlayer (client: Client) {
        delete this.players[client.sessionId]
        console.log('removed player')
    }
}