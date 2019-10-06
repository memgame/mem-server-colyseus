import { Trigger, TriggerType } from "./trigger";

export class TriggerCast extends Trigger {
    constructor () {
        super()
        this.triggerType = TriggerType.Cast
    }
}