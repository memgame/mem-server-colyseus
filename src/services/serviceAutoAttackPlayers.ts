import { distanceBetween } from "../utility/vector2";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";
import { Room } from "colyseus";

export function autoAttackPlayers (state: IStatePlayers, elapsedTime: number, room: Room): void {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target == null) continue

        var isAutoAttackReady = player.lastAutoAttack <= (elapsedTime - player.attackSpeed)

        if (!isAutoAttackReady) continue

        var distanceToTarget = distanceBetween(player.position.x, player.position.z, player.target.position.x, player.target.position.z)
        var isTargetInAutoAttackDistance = distanceToTarget <= player.attackRange

        if (!isTargetInAutoAttackDistance) continue

        console.log('auto attack')

        room.broadcast({
            ACTION_TYPE: 'AUTO_ATTACK',
            payload: {
                playerId: player.id
            }
        })

        player.lastAutoAttack = elapsedTime
    }
}