import { Position } from './../models/position'
import { Schema, type } from '@colyseus/schema'
import { ITargetable } from './ITargetable';
import { IHittable } from './IHittable';
import { clamp } from '../utility/clamp';
import { IHealable } from './IHealable';
import { Weapon, WeaponSlot } from './weapon';

export class Player extends Schema implements ITargetable, IHittable, IHealable {
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

    public target: ITargetable & IHittable

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
    public healthRegeneration: number
    @type('number')
    public energy: number
    @type('number')
    public energyMax: number
    public energyRegeneration: number

    @type('number')
    public attackRange: number
    @type('number')
    public attackDamage: number
    @type('number')
    public attackSpeed: number
    public lastAutoAttack: number
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

    @type(Weapon)
    public mainHand: Weapon

    @type(Weapon)
    public offHand: Weapon

    constructor(
        id: string
    ) {
        super();
        this.id = id
        this.name = "no name"

        this.isAlive = true

        this.position = new Position(125, 0, 125)
        this.target = null
        this.moveTo = null

        this.moveSpeed = 300
        this.rotation = 0
        this.locomationAnimationSpeedPercent = 0

        this.healthMax = 300
        this.health = 200
        this.healthRegeneration = 3
        this.energy = 0
        this.energyMax = 30
        this.energyRegeneration = 1

        this.attackRange = 10
        this.attackDamage = 40
        this.attackSpeed = 500
        this.lastAutoAttack = 0
        this.attackSpeedPercent = 1
        this.critChancePercent = 0.05
        this.critBonusPercent = 2

        this.abilityPower = 40
        this.cooldownReductionPercent = 0.05

        this.armor = 10
        this.magicResistance = 10

        this.lifestealPercent = 0.05
        this.spellvampPercent = 0.05

        this.mainHand = null
        this.offHand = null
    }

    public setTarget(target: ITargetable & IHittable): void {
        if (!this.isAlive) return

        this.target = target
    }

    public setMoveTo (x: number, y: number, z: number) {
        if (!this.isAlive) return

        this.moveTo = new Position(x, y, z)
        this.setRotation(x, z)
    }

    public setRotation (x: number, z: number) {
        var angle = (Math.atan2(x - this.position.x, z - this.position.z) * (180/Math.PI))
        if (angle < 0) {
            angle = angle + 360
        }
        this.rotation = angle
    }

    public hit (physicalDamage: number, magicDamage: number, trueDamage: number) {
        //TODO calculate with armor and resistance
        console.log('is alive', this.isAlive)
        console.log('health', this.health)

        if (!this.isAlive) return

        var totalDamage = physicalDamage + magicDamage + trueDamage
        this.health = clamp(this.health - totalDamage, 0, this.healthMax)

        this.isAlive = this.health > 0 ? true : false

        if (!this.isAlive) {
            this.moveTo = null
            this.target = null
        }

        console.log('is alive', this.isAlive)
        console.log('health', this.health)
    }

    public heal (health: number) {
        if (!this.isAlive) return
        
        this.health = clamp(this.health + health, 0, this.healthMax)
    }

    public addEnergy (energy: number) {
        if (!this.isAlive) return

        this.energy = clamp(this.energy + energy, 0, this.energyMax)
    }

    public removeEnergy (energy: number) {
        if (!this.isAlive) return

        this.energy = clamp(this.energy - energy, 0, this.energyMax)
    }

    public equipWeapon (weapon: Weapon) {
        switch(weapon.slot) {
            case WeaponSlot.OffHand:
                this.offHand = weapon;
                if (!!this.mainHand && this.mainHand.slot == WeaponSlot.TwoHanded) {
                    this.mainHand = null;
                }
                break;
            case WeaponSlot.OneHanded:
                this.mainHand = weapon;
                break;
            case WeaponSlot.TwoHanded:
                this.mainHand = weapon;
                this.offHand = null;
                break;
        }
    }
}