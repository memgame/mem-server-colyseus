import { BaseEntity } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";
import { Bar } from "../models/bar";
import { Attributes } from "../models/attributes";
import { IMoveable } from "../interfaces/IMoveable";
import { ITargetable } from "../interfaces/ITargetable";
import { IHittable } from "../interfaces/IHittable";
import { Weapon, WeaponSlot, WeaponType, CombatStyle } from "../models/weapon";
import { clamp } from "../utility/clamp";
import { IHealable } from "../interfaces/IHealable";
import weapons from '../data/weapons.json'

export class Unit extends BaseEntity implements IMoveable, ITargetable, IHittable, IHealable {
    @type('string') public name: string
    @type(Position) public position: Position
    @type('number') public moveSpeed: number
    @type('number') public rotation: number
    @type('number') public locomationAnimationSpeedPercent: number
    @type('boolean') public isAlive: boolean
    @type(Bar) public health: Bar
    @type(Bar) public energy: Bar
    @type(Attributes) public attributes: Attributes
    @type(Weapon) public mainHand: Weapon
    @type(Weapon) public offHand: Weapon

    public moveTo: Position
    public target: ITargetable & IHittable
    public lastAutoAttack: number

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

    hit(physicalDamage: number, magicDamage: number, trueDamage: number) {
        console.log('is alive', this.isAlive)
        console.log('health', this.health)
        if (!this.isAlive) return

        const finalPhysicalDamage = physicalDamage * (100 / (100 + this.attributes.armor))
        const finalMagicDamage = magicDamage * (100 / (100 + this.attributes.magicResistance))

        const totalDamage = finalPhysicalDamage + finalMagicDamage + trueDamage
        this.health.current = clamp(this.health.current - totalDamage, 0, this.health.max)

        this.isAlive = this.health.current > 0 ? true : false

        if (!this.isAlive) {
            this.moveTo = null
            this.target = null
        }

        console.log('is alive', this.isAlive)
        console.log('health', this.health)
    }

    public heal (health: number) {
        if (!this.isAlive) return
        
        this.health.current = clamp(this.health.current + health, 0, this.health.max)
    }

    public addEnergy (energy: number) {
        if (!this.isAlive) return

        this.energy.current = clamp(this.energy.current + energy, 0, this.energy.max)
    }

    public removeEnergy (energy: number) {
        if (!this.isAlive) return

        this.energy.current = clamp(this.energy.current - energy, 0, this.energy.max)
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

    static generate (): Unit {
        const unit = new Unit()
        unit.name = 'Test123'
        unit.isAlive = true
        unit.position = new Position(125, 0, 125)
        unit.target = null
        unit.moveTo = null
        unit.moveSpeed = 300
        unit.rotation = 0
        unit.locomationAnimationSpeedPercent = 0
        unit.health = new Bar()
        unit.health.max = 300
        unit.health.current = 200
        unit.health.regenerationSpeed = 3

        unit.energy = new Bar()
        unit.energy.max = 30
        unit.energy.current = 0
        unit.energy.regenerationSpeed = 1

        unit.lastAutoAttack = 0

        unit.attributes = new Attributes()
        unit.attributes.attackDamage = 40
        unit.attributes.attackSpeedPercent = 1
        unit.attributes.abilityPower = 50
        unit.attributes.armor = 10
        unit.attributes.magicResistance = 10
        const filteredWeapons = weapons.filter(obj => {
            return obj.type == WeaponType.Bow
        })
        const weaponToEquip = filteredWeapons[Math.floor(Math.random() * filteredWeapons.length)]
        const weapon = new Weapon(weaponToEquip.id)
        weapon.slot = WeaponSlot[weaponToEquip.slot]
        weapon.type = WeaponType[weaponToEquip.type]
        weapon.combatStyle = CombatStyle[weaponToEquip.combatStyle]
        weapon.attackRange = weaponToEquip.attackRange
        weapon.attackSpeed = weaponToEquip.attackSpeed
        unit.equipWeapon(weapon)
        unit.setMoveTo(0, 0, 0)

        return unit;
    }
}