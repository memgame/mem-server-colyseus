import { Effect, EffectType } from "../effect";
import { Unit } from "../../entities/unit";
import { CastContext } from "../castContext";
import { Position } from "../../models/position";

export abstract class Trigger extends Effect {

    constructor () {
        super()
        this.type = EffectType.Trigger
    }

    trigger (caster: Unit, target: Unit, location: Position, level: number): boolean {
        const castContext = new CastContext()
        castContext.caster = caster
        castContext.level = level

        const targets: Array<Unit> = []
        targets.push(target)

        return this.execute(
            castContext,
            targets
        )
    }

    execute (context: CastContext, targets: Array<Unit>): boolean {
        return this.executeChildren(context, targets)
    }

/*
    fun trigger(caster: Actor, target: Actor, level: Int): Boolean {
        return execute(
                CastContext(level, caster, null),
                listOf(target))
    }

    override fun execute(context: CastContext, targets: List<Actor>): Boolean {
        try {
            running = true
            return executeChildren(context, targets)
        } finally {
            running = false
        }
    }
    */
}