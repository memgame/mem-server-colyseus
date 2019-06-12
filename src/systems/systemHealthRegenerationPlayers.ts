import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function systemHealthRegenerationPlayers (state: IStatePlayers): void {
    for(let key in state.players) {
        var player: Player = state.players[key]

        player.heal(player.healthRegeneration)
    }
}