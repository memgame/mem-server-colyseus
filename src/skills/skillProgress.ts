import { Schema, type } from "@colyseus/schema";

export class SkillProgress extends Schema {
    @type('number') public level: number
    @type('number') public maxLevel: number
    @type('string') public skillId: string
    @type('number') public cooldown: number

    constructor (level: number, maxLevel: number, skillId: string, cooldown: number) {
        super();
        this.level = level
        this.maxLevel = maxLevel
        this.skillId = skillId
        this.cooldown = cooldown
    }

    levelUp (value: number): boolean {
        const newLevel = this.level + value
        if(this.maxLevel < newLevel) {
            return false
        }
        this.level = newLevel
        return true
    }
}