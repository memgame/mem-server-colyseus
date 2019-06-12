import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function systemEnergyRegenerationPlayers (state: IStatePlayers): void {
    for(let key in state.players) {
        var player: Player = state.players[key]

        player.addEnergy(player.energyRegeneration)
    }
}