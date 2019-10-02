import { Schema, type } from "@colyseus/schema"
import { Trigger } from './trigger/trigger';
import api from '../api'
import { Unit } from "../entities/unit";

export class Skill extends Schema {
  public id: string
  public name: string = 'Test Skill'
  public description: string
  public maxLevel: number = 5
  public icon: string

  public cooldownBase: number
  public cooldownScale: number

  private data: any

  private triggers: Array<Trigger> = []
  
  constructor (id: string) {
    super();
    this.id = id
    this.data = api.skills.getSkillById(id);
    this.name = this.data.name
    this.description = this.data.description
    this.maxLevel = this.data.maxLevel
    this.icon = this.data.icon
    this.cooldownBase = this.data.cooldownBase
    this.cooldownScale = this.data.cooldownScale
  }

  static canSkillBeCasted(skill: Skill, caster: Unit, level: number, lastCastTime: number, elapsedTime: number): boolean {
    if (level <= 0) return false

    const cooldown = skill.cooldownBase + (skill.cooldownScale * (level - 1))
    const isSkillOnCooldown = !(lastCastTime <= 0) && lastCastTime > elapsedTime - (cooldown * 1000)
    if(isSkillOnCooldown) return false

    return true
  }
}