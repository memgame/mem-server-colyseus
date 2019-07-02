import { BaseEntitiy } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";
import { Bar } from "../models/bar";

export class Unit extends BaseEntitiy {

    @type(Position) public position: Position
    @type('number') public moveSpeed: number
    @type('number') public rotation: number
    @type('number') public locomationAnimationSpeedPercent: number;
    @type(Bar) public health: Bar
    @type(Bar) public energy: Bar

    public moveTo: Position
    //attackDamage
    //attackSpeed
}