import { Schema, type } from "@colyseus/schema"
import { Position } from './../models/position'

export class CapturePoint extends Schema {
    @type('string')
    public id: string
    @type(Position)
    public position: Position
    @type('boolean')
    public isSpawn: boolean
    @type('number')
    public radius: number
    @type('string')
    public team: string
    @type('number')
    public takenTo: number
    @type('number')
    public scorePoints: number

    constructor (
        id: string
    ) {
        super()
        this.id = id
    }
}