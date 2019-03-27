import { Position } from './../models/position'
import { Schema, type } from '@colyseus/schema'

export class Player extends Schema {
    @type('string')
    public id: string

    @type('string')
    public name: string

    @type('string')
    public team: string

    @type('boolean')
    public isAlive: boolean

    @type(Position)
    public position: Position

    @type('number')
    public rotation: number
    @type('number')
    public moveSpeed: number
    @type('number')
    public locomationAnimationSpeedPercent: number;

    public moveTo: Position

    @type('number')
    public health: number
    @type('number')
    public energy: number

    @type('number')
    public attackDamage: number
    @type('number')
    public attackSpeedPercent: number
    @type('number')
    public critChancePercent: number
    @type('number')
    public critBonusPercent: number

    @type('number')
    public abilityPower: number
    @type('number')
    public cooldownReductionPercent: number

    @type('number')
    public armor: number
    @type('number')
    public magicResistance: number

    @type('number')
    public lifestealPercent: number
    @type('number')
    public spellvampPercent: number

    constructor(
        id: string
    ) {
        super();
        this.id = id
        this.position = new Position(125, 0, 125)
        this.rotation = 0
        this.moveSpeed = 300
    }
}