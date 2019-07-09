import { Schema, type } from "@colyseus/schema";
import { Skill } from "./skill";

export class SkillProgress extends Schema {
    @type('number') public cooldown: number = 0
    @type('number') public level: number = 0
    @type(Skill) public skill: Skill

    constructor (aSkill: Skill) {
        super();
        this.skill = aSkill

        this.level = Math.floor(Math.random() * this.skill.maxLevel);
    }

    levelUp (value: number): boolean {
        const newLevel = this.level + value
        if(this.skill.maxLevel < newLevel) {
            return false
        }
        this.level = newLevel
        return true
    }
}