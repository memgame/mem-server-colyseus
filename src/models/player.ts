import { Schema, type } from '@colyseus/schema'

export class Player extends Schema {
    @type('string') public id: string
    @type('string') public name: string
    @type('string') public team: string
    @type('string') public unitId: string



    constructor(
        id: string
    ) {
        super();
        this.id = id
    }
}