import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function targetCheckPlayer (state: IStatePlayers) {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target == null) continue

        if(!player.target.isAlive) {
            player.setTarget(null)
        }
    }
}