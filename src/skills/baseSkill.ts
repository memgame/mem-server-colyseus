import shortid from 'shortid';
import { Schema, type } from "@colyseus/schema";

export class BaseEntity extends Schema {
  @type('string') id: string;
  @type('string') type: SkillType;
  @type('string') name: string;
  @type('string') description: string;
  
  constructor (id?: string) {
    super();
    this.id = id || shortid.generate()
  }
}

export enum SkillType {
  PassiveSkill = 'PassiveSkill',
  SkillShot = 'SkillShot',
  TargetSkill = 'TargetSkill'
}