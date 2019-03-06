import { Client } from "colyseus";
import { EntityMap } from "../types/entityMap"
import { Player } from "../models/player";

export interface IStatePlayers {
    players: EntityMap<Player>

    addPlayer (client: Client, options: any)
    removePlayer (client: Client)
}