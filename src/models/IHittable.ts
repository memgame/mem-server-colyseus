import { Schema } from "@colyseus/schema";

export interface IHittable extends Schema {
    hit (physicalDamage: number, magicDamage: number, trueDamage: number)
}