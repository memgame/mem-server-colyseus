import { BaseEntity } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";
import { Bar } from "../models/bar";
import { Attributes } from "../models/attributes";
import { IMoveable } from "../interfaces/IMoveable";
import { ITargetable } from "../interfaces/ITargetable";
import { IHittable } from "../interfaces/IHittable";

export class Unit extends BaseEntity implements IMoveable, ITargetable, IHittable {
    @type('string') public name: string
    @type(Position) public position: Position
    @type('number') public moveSpeed: number
    @type('number') public rotation: number
    @type('number') public locomationAnimationSpeedPercent: number;
    @type('boolean') public isAlive: boolean
    @type(Bar) public health: Bar
    @type(Bar) public energy: Bar
    @type(Attributes) public attributes: Attributes

    public moveTo: Position
    public target: ITargetable & IHittable

    hit(physicalDamage: number, magicDamage: number, trueDamage: number) {
        throw new Error("Method not implemented.");
    }
}