import { Vector2 } from "ts-vector-math"
import BigNumber from "bignumber.js"
/*
var x = new BigNumber(0.1).plus(0.2)
console.log(x.toNumber()) //0.3
*/
export function lerp(currentPosition: number, targetPosition: number, t: number): number {

    /*
    var distance = new BigNumber(targetPosition).minus(currentPosition).toNumber()
    var destination = new BigNumber(currentPosition).plus(t).multipliedBy(distance).toNumber()

    return destination
    */
   return currentPosition + t * (targetPosition - currentPosition)
}