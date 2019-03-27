import { Schema, type } from "@colyseus/schema";

export class Team extends Schema {
    @type('string')
    public id: string
    @type('string')
    public color: string
    @type('number')
    public score: number

    constructor (
        id: string
    ) {
        super()
        this.id = id
    }
}