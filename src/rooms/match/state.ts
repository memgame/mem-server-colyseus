import { EntityMap, Client } from 'colyseus'
import { Player } from '../../models/player'
import { IStatePlayers } from '../IStatePlayers'

import { movePlayers } from '../../services/serviceMovePlayers'

export class State implements IStatePlayers {
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

    public calculateState() {
        //TODO add move calculation
        movePlayers(this)
    }
}