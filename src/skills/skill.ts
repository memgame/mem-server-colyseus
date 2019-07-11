import shortid from 'shortid'
import { Schema, type } from "@colyseus/schema"
import { Trigger } from './trigger/trigger';

export class Skill extends Schema {
  @type('string') id: string
  @type('string') name: string = 'Test Skill'
  @type('string') description: string
  @type('number') maxLevel: number = 5
  @type('string') icon: string

  private triggers: Array<Trigger> = []
  
  constructor (id?: string) {
    super();
    this.id = id || shortid.generate()
  }
}