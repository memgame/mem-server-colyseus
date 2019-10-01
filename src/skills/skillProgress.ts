import { Schema, type } from "@colyseus/schema";
import { Unit } from "../entities/unit";

export class SkillProgress extends Schema {
    @type('number') public level: number
    @type('number') public maxLevel: number
    @type('string') public skillId: string
    @type('number') public cooldown: number
    @type('number') public lastCastTime: number = 0

    constructor (level: number, maxLevel: number, skillId: string) {
        super();
        this.level = level
        this.maxLevel = maxLevel
        this.skillId = skillId
    }

    levelUp (value: number): boolean {
        const newLevel = this.level + value
        if(this.maxLevel < newLevel) {
            return false
        }
        this.level = newLevel
        return true
    }

    cast (caster: Unit): boolean {
        console.log(`skill: ${this.skillId} casted from ${caster.name}`)
        //TODO implement skill execute
        return true;
    }
}