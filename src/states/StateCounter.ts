import { Schema, type } from "@colyseus/schema"

export class StateCounter extends Schema implements IStateCounter {
    @type("number")
    counter: number = 0

    incrementCounter (payload: number) {
        this.counter = this.counter + payload
    }
}

export interface IStateCounter extends Schema {
    counter: number

    incrementCounter (payload: number)
}