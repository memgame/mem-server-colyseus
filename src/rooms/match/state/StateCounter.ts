export class StateCounter implements IStateCounter {
    counter: number = 0

    incrementCounter (payload: number) {
        this.counter = this.counter + payload
    }
}

interface IStateCounter {
    counter: number

    incrementCounter (payload: number)
}