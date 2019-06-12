import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";
import { Position } from "../models/position";

export function systemRespawnPlayers (state: IStatePlayers) {
    for(let key in state.players) {
        var player: Player = state.players[key]

        if (!player.isAlive) {
            player.health = player.healthMax
            player.position = new Position(125, 0 , 125)
            player.isAlive = true
        }
    }
}