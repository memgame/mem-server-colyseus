import { Schema, type } from "@colyseus/schema";

export class Attributes extends Schema {
    @type('number') public attackDamage: number
    @type('number') public abilityPower: number
    @type('number') public attackSpeedPercent: number
}