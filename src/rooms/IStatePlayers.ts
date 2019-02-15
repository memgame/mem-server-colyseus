import { EntityMap, Client } from "colyseus";
import { Player } from "../models/player";

export interface IStatePlayers {
    players: EntityMap<Player>

    addPlayer (client: Client, options: any)
    removePlayer (client: Client)
}