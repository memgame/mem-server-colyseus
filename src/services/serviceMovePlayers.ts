import BigNumber from "bignumber.js"
import { IStatePlayers } from "../rooms/IStatePlayers"
import { Vector3 } from "ts-vector-math"
import { lerp } from "../utility/lerp";

export function movePlayers (state: IStatePlayers, deltaTime: number) {
    for (let key in state.players) {
        var player = state.players[key]
        if(player.moveTo == null) {
            continue
        }

        var playerPosition = new Vector3([player.position.x, player.position.y,player.position.z])
        var playerPositionMoveTo = new Vector3([player.moveTo.x, player.moveTo.y, player.moveTo.z])

        var isPlayerAtDestination = playerPosition.equals(playerPositionMoveTo)

        if(isPlayerAtDestination) {
            player.moveTo = null
            continue
        }


        var moveSpeedPerSec = new BigNumber(player.moveSpeed).dividedBy(60).toNumber()

        var distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()

        var distance = Vector3.distance(playerPosition, playerPositionMoveTo)

        var t = new BigNumber(distanceToTravel).dividedBy(distance).toNumber()
        //Clamp
        t = Math.min(Math.max(0, t), 1)

        player.position.x = lerp(playerPosition.x, playerPositionMoveTo.x, t)
        player.position.z = lerp(playerPosition.z, playerPositionMoveTo.z, t)
        console.log('destination new:', player.position)
        
    }

}