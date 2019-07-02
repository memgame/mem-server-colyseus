import { Schema, type } from "@colyseus/schema";

export class Bar extends Schema {
    @type('number') public current: number
    @type('number') public max: number
    @type('number') public regenerationSpeed: number
}