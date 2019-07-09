import shortid from 'shortid'
import { Schema, type } from "@colyseus/schema"

export class BaseSkill extends Schema {
  @type('string') id: string
  @type('string') type: SkillType
  @type('string') name: string
  @type('string') description: string
  @type('number') maxLevel: number
  @type('string') icon: string
  
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