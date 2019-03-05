import BigNumber from "bignumber.js"
import { IStatePlayers } from "../rooms/IStatePlayers"
import { Vector3 } from "ts-vector-math"
import { lerp } from "../utility/lerp";
import { distanceBetween } from "../utility/vector2";

export function movePlayers (state: IStatePlayers, deltaTime: number) {
    for (let key in state.players) {
        var player = state.players[key]
        if(player.moveTo == null) {
            continue
        }

        var playerPosition = player.position
        console.log(playerPosition)
        var playerPositionMoveTo = player.moveTo

        var distance = distanceBetween(playerPosition.x, playerPosition.z, playerPositionMoveTo.x, playerPositionMoveTo.z)
        console.log('distance ', distance)

        var isPlayerAtDestination = distance == 0

        if(isPlayerAtDestination) {
            player.moveTo = null
            continue
        }

        console.log(player.moveSpeed)
        var moveSpeedPerSec = new BigNumber(player.moveSpeed).dividedBy(60).toNumber()
        console.log('moveSpeedPerSec', moveSpeedPerSec)

        var distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()
        console.log('distanceToTravel', distanceToTravel)

        var t = new BigNumber(distanceToTravel).dividedBy(distance).toNumber()
        //Clamp
        t = Math.min(Math.max(0, t), 1)

        player.position.x = lerp(playerPosition.x, playerPositionMoveTo.x, t)
        player.position.z = lerp(playerPosition.z, playerPositionMoveTo.z, t)
        console.log('destination new:', player.position)
        
    }

}