import { Schema } from "@colyseus/schema";

export interface IHittable extends Schema {
    isAlive: boolean
    hit (physicalDamage: number, magicDamage: number, trueDamage: number)
}