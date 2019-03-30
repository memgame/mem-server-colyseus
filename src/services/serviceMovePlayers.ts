import BigNumber from "bignumber.js"
import { lerp } from "../utility/lerp";
import { distanceBetween } from "../utility/vector2";
import { IStatePlayers } from "../states/StatePlayers";

export function movePlayers (state: IStatePlayers, deltaTime: number): void {
    for (let key in state.players) {
        var player = state.players[key]
        if(player.moveTo == null) {
            continue
        }

        var playerPosition = player.position
        var playerPositionMoveTo = player.moveTo

        var distance = distanceBetween(playerPosition.x, playerPosition.z, playerPositionMoveTo.x, playerPositionMoveTo.z)

        var isPlayerAtDestination = distance == 0

        if(isPlayerAtDestination) {
            player.moveTo = null
            player.locomationAnimationSpeedPercent = 0
            continue
        }
        var moveSpeedPerSec = new BigNumber(player.moveSpeed).dividedBy(60).toNumber()

        var distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()

        var t = new BigNumber(distanceToTravel).dividedBy(distance).toNumber()
        //Clamp
        t = Math.min(Math.max(0, t), 1)

        player.position.x = lerp(playerPosition.x, playerPositionMoveTo.x, t)
        player.position.z = lerp(playerPosition.z, playerPositionMoveTo.z, t)
        player.locomationAnimationSpeedPercent = 0.6
    }

}