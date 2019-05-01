import { Schema } from "@colyseus/schema";

export interface IHealable extends Schema {
    heal (health: number)
}