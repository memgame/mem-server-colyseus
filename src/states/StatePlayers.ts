import { Schema, type, MapSchema } from "@colyseus/schema"
import { Player } from "../models/player";

export class StatePlayers extends Schema implements IStatePlayers {
    @type({ map: Player })
    players: MapSchema<Player> = new MapSchema<Player>();
    
    public addPlayer (player: Player): void {
        this.players[player.id] = player
        console.log('added player')
    }

    public removePlayer (playerId: string): void {
        delete this.players[playerId]
        console.log('removed player')
    }
}

export interface IStatePlayers extends Schema {
    players: MapSchema<Player>

    addPlayer (player: Player): void
    removePlayer (playerId: string): void
}