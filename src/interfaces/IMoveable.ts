import { Position } from "../models/position";

export interface IMoveable {
    position: Position
    moveSpeed: number
    locomationAnimationSpeedPercent: number
    moveTo: Position
    isAlive: boolean
}