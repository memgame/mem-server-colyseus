import { Position } from './../models/position'

export class CapturePoint {
    public id: string
    public position: Position
    public isSpawn: boolean
    public radius: number
    public team: string
    public takenTo: number
    public scorePoints: number

    constructor (
        id: string
    ) {
        this.id = id
    }
}