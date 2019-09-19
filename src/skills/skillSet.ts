import { Schema, type } from "@colyseus/schema";
import { SkillProgress } from "./skillProgress";

export class SkillSet extends Schema {
    @type(SkillProgress) public passiveSkill: SkillProgress
    @type(SkillProgress) public slot1: SkillProgress
    @type(SkillProgress) public slot2: SkillProgress
    @type(SkillProgress) public slot3: SkillProgress
    @type(SkillProgress) public ultimateSkill: SkillProgress
}