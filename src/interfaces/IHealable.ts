import { Schema } from "@colyseus/schema";

export interface IHealable extends Schema {
    isAlive: boolean
    heal (health: number)
}