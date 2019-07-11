import { Effect, EffectType } from "../effect";
import { Unit } from "../../entities/unit";
import { CastContext } from "../castContext";

export abstract class Condition extends Effect {

    private applyToCaster: boolean = false
    private applyToTarget: boolean = true

    constructor () {
        super()
        this.type = EffectType.Condition
    }

}