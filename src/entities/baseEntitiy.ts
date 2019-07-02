import shortid from 'shortid';
import { Schema, type } from "@colyseus/schema";

export class BaseEntitiy extends Schema {
  @type('string') id: string;
  @type('string') type: EnitityType;
  
  constructor (id?: string) {
    super();
    this.id = id || shortid.generate()
  }
  update(currentTime?: number) {
    /* does nothing */
  }
}

export enum EnitityType {
  Unit = 'Unit',
  Building = 'Building'
}