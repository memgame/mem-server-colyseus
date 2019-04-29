import { distanceBetween } from "../utility/vector2";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function autoAttackPlayers (state: IStatePlayers, elapsedTime: number): void {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target == null) continue

        var isAutoAttackReady = player.lastAutoAttack <= (elapsedTime - player.attackSpeed)

        if (!isAutoAttackReady) continue

        var distanceToTarget = distanceBetween(player.position.x, player.position.z, player.target.position.x, player.target.position.y)
        var isTargetInAutoAttackDistance = distanceToTarget <= player.attackRange

        if (!isTargetInAutoAttackDistance) continue

        //TODO make auto attack

        player.lastAutoAttack = elapsedTime
    }
}