import { BaseEntity } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";
import { Bar } from "../models/bar";
import { Attributes } from "../models/attributes";

export class Unit extends BaseEntity {

    @type('string') public name: string
    @type(Position) public position: Position
    @type('number') public moveSpeed: number
    @type('number') public rotation: number
    @type('number') public locomationAnimationSpeedPercent: number;
    @type(Bar) public health: Bar
    @type(Bar) public energy: Bar
    @type(Attributes) public attributes: Attributes

    public moveTo: Position
    //attackDamage
    //attackSpeed
}