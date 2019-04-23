import { Schema } from "@colyseus/schema";

export interface IHittable extends Schema {   
    healthMax: number
    health: number
}