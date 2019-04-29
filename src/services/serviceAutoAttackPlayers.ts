import { distanceBetween } from "../utility/vector2";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function autoAttackPlayers (state: IStatePlayers, deltaTime: number): void {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target == null) continue

        var distanceToTarget = distanceBetween(player.position.x, player.position.z, player.target.position.x, player.target.position.y)
        var isTargetInAutoAttackDistance = distanceToTarget <= player.attackRange

        if (!isTargetInAutoAttackDistance) continue

        //todo check if auto attack is ready
        var isAutoAttackReady = player.lastAutoAttack 
        
        //make auto attack
    }
}