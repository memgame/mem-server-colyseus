import { Position } from './../models/position'
import { Schema, type } from '@colyseus/schema'
import { ITargetable } from './ITargetable';
import { IHittable } from './IHittable';

export class Player extends Schema implements ITargetable, IHittable {
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

    public target: ITargetable

    public moveTo: Position

    @type('number')
    public moveSpeed: number
    @type('number')
    public rotation: number
    @type('number')
    public locomationAnimationSpeedPercent: number;

    @type('number')
    public healthMax: number
    @type('number')
    public health: number
    @type('number')
    public energy: number

    @type('number')
    public attackDamage: number
    @type('number')
    public attackSpeed: number
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
        this.name = "no name"

        this.isAlive = true

        this.position = new Position(125, 0, 125)
        this.moveTo = null

        this.moveSpeed = 300
        this.rotation = 0
        this.locomationAnimationSpeedPercent = 0

        this.healthMax = 300
        this.health = 200
        this.energy = 30

        this.attackDamage = 40
        this.attackSpeed = 0.5
        this.attackSpeedPercent = 1
        this.critChancePercent = 0.05
        this.critBonusPercent = 2

        this.abilityPower = 40
        this.cooldownReductionPercent = 0.05

        this.armor = 10
        this.magicResistance = 10

        this.lifestealPercent = 0.05
        this.spellvampPercent = 0.05
    }
}