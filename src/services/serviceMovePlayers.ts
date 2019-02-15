import BigNumber from "bignumber.js"
import { IStatePlayers } from "../rooms/IStatePlayers"
import { Vector3 } from "ts-vector-math";

export function movePlayers (state: IStatePlayers, deltaTime: number) {
    /*
    var x = new BigNumber(0.1).plus(0.2)
    console.log(x.toNumber()) //0.3
    */
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
        //TODO move player to moveTo position

    }

}