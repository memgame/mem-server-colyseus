import { StateCounter } from './StateCounter';

export class StateRoot implements IStateRoot {
    stateCounter: StateCounter = new StateCounter()
}


interface IStateRoot {
    stateCounter: StateCounter
}