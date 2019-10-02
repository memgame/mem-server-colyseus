import { Schema, type } from "@colyseus/schema";
import { Unit } from "../entities/unit";
import { Skill } from "./skill";

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

    cast (caster: Unit, elapsedTime: number): boolean {
        const skill = new Skill(this.skillId)
        const canSkillBeCasted = Skill.canSkillBeCasted(skill, caster, this.level, this.lastCastTime, elapsedTime)
        if (canSkillBeCasted) {
            console.log(`skill: ${this.skillId} casted from ${caster.name}`)
            //TODO implement skill execute
            this.lastCastTime = elapsedTime
        } else {
            console.log(`skill: ${this.skillId} cant be casted from ${caster.name}`)
        }
        return canSkillBeCasted;
    }
}