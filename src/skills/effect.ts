import { CastContext } from "./castContext";
import { Unit } from "../entities/unit";

export abstract class Effect {
    public id: string
    public type: EffectType

    private children: Array<Effect>

    abstract execute (context: CastContext, targets: Array<Unit>): boolean

    executeChildren  (context: CastContext, targets: Array<Unit>): boolean {
        if (!targets.length) return false
        let worked: boolean = true
        this.children.forEach(obj => {
            const passed = obj.execute(context, targets)
            worked = worked ? passed : worked
        })

        return worked
    }

    cleanUp (caster: Unit) {
        this.doCleanUp(caster)
        this.children.forEach(obj => {
            obj.doCleanUp(caster)
        })
    }

    doCleanUp(caster: Unit) { }
}

export enum EffectType {
    Condition = 'Condition',
    Mechanic = 'Mechanic',
    Target = 'Target',
    Trigger = 'Trigger'
}