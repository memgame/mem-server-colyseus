import BigNumber from "bignumber.js"
import { lerp } from "../utility/lerp";
import { distanceBetween } from "../utility/vector2";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function movePlayers (state: IStatePlayers, deltaTime: number): void {
    for (let key in state.players) {
        var player: Player = state.players[key]

        if (player.target) {
            var distanceToTarget = distanceBetween(player.position.x, player.position.z, player.target.position.x, player.target.position.z)
            
            //TODO check if in attack range
            if (distanceToTarget > player.attackRange) {
                player.setMoveTo(player.target.position.x, player.target.position.y, player.target.position.z)
            } else {
                player.moveTo = null
            }
        }

        if (player.moveTo == null) {
            continue
        }

        var distance = distanceBetween(player.position.x, player.position.z, player.moveTo.x, player.moveTo.z)

        var isPlayerAtDestination = distance == 0

        if (isPlayerAtDestination) {
            player.moveTo = null
            player.locomationAnimationSpeedPercent = 0
            continue
        }
        var moveSpeedPerSec = new BigNumber(player.moveSpeed).dividedBy(60).toNumber()

        var distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()

        var t = new BigNumber(distanceToTravel).dividedBy(distance).toNumber()
        //Clamp
        t = Math.min(Math.max(0, t), 1)

        player.position.x = lerp(player.position.x, player.moveTo.x, t)
        player.position.z = lerp(player.position.z, player.moveTo.z, t)
        player.locomationAnimationSpeedPercent = 0.6
    }

}