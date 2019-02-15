import BigNumber from "bignumber.js"
import { IStatePlayers } from "../rooms/IStatePlayers"

export function movePlayers (state: IStatePlayers) {
    var x = new BigNumber(0.1).plus(0.2)
    console.log(x.toNumber()) //0.3
    for (let key in state.players) {
        //TODO move player to moveTo position
        // state.players[key]
    }

}