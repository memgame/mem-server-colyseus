import { Schema, type } from "@colyseus/schema";
import { SkillProgress } from "./skillProgress";
import { Skill } from "./skill";

export class SkillSet extends Schema {
    @type(SkillProgress) public passiveSkill: SkillProgress = new SkillProgress(new Skill())
    @type(SkillProgress) public slot1: SkillProgress = new SkillProgress(new Skill())
    @type(SkillProgress) public slot2: SkillProgress = new SkillProgress(new Skill())
    @type(SkillProgress) public slot3: SkillProgress = new SkillProgress(new Skill())
    @type(SkillProgress) public ultimateSkill: SkillProgress = new SkillProgress(new Skill())
}