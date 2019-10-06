import { Trigger, TriggerType } from './trigger/trigger';
import { Costs } from './costs'
import api from '../api'
import { Unit } from "../entities/unit";
import { EffectType } from './effect';
import { TriggerCast } from './trigger/triggerCast';

export class Skill {
  public id: string
  public name: string = 'Test Skill'
  public description: string
  public maxLevel: number = 5
  public icon: string

  public cooldownBase: number
  public cooldownScale: number

  public pointsSpentReqBase: number
  public pointsSpentReqScale: number

  public costs: Costs = new Costs()

  private triggers: Array<Trigger> = []
  
  constructor (id: string) {
    this.id = id
    const data = api.skills.getSkillById(id);
    this.name = data.name
    this.description = data.description
    this.maxLevel = data.maxLevel
    this.icon = data.icon
    this.cooldownBase = data.cooldownBase
    this.cooldownScale = data.cooldownScale

    this.costs.energyBase = data.costs.energyBase
    this.costs.energyScale = data.costs.energyScale
    this.costs.healthBase = data.costs.healthBase
    this.costs.healthScale = data.costs.healthScale

    this.pointsSpentReqBase = data.pointsSpentReqBase
    this.pointsSpentReqScale = data.pointsSpentReqScale
    data.effects.forEach(effect => {
      //TODO validation
      const effectType = effect.type
      if (effectType == EffectType.Trigger) {
        const triggerType = effect.data.type
        switch (triggerType) {
          case TriggerType.Cast:
            const trigger = new TriggerCast()
            this.triggers.push(trigger)
            break;

          default:
            //dosnt match a trigger type
            break;
        }
      }
    });
    console.log(this)
  }

  static canSkillBeCasted(skill: Skill, caster: Unit, level: number, lastCastTime: number, elapsedTime: number): boolean {
    if (level <= 0) return false

    const cooldown = skill.cooldownBase + (skill.cooldownScale * (level - 1))
    const isSkillOnCooldown = !(lastCastTime <= 0) && lastCastTime > elapsedTime - (cooldown * 1000)
    if(isSkillOnCooldown) return false

    return true
  }
}