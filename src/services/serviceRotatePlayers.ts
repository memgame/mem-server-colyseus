import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function rotatePlayersToTarget (state: IStatePlayers): void {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target == null) continue

        player.setRotation(player.target.position.x, player.target.position.z)
    }
}