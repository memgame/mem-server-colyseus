import { BaseEntity } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";
import { Bar } from "../models/bar";
import { Attributes } from "../models/attributes";
import { IMoveable } from "../interfaces/IMoveable";
import { ITargetable } from "../interfaces/ITargetable";
import { IHittable } from "../interfaces/IHittable";
import { Weapon, WeaponSlot } from "../models/weapon";
import { clamp } from "../utility/clamp";
import { IHealable } from "../interfaces/IHealable";

export class Unit extends BaseEntity implements IMoveable, ITargetable, IHittable, IHealable {
    @type('string') public name: string
    @type(Position) public position: Position
    @type('number') public moveSpeed: number
    @type('number') public rotation: number
    @type('number') public locomationAnimationSpeedPercent: number;
    @type('boolean') public isAlive: boolean
    @type(Bar) public health: Bar
    @type(Bar) public energy: Bar
    @type(Attributes) public attributes: Attributes
    @type(Weapon) public mainHand: Weapon
    @type(Weapon) public offHand: Weapon

    public moveTo: Position
    public target: ITargetable & IHittable
    
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
        //TODO calculate with armor and resistance
        console.log('is alive', this.isAlive)
        console.log('health', this.health)

        if (!this.isAlive) return

        var totalDamage = physicalDamage + magicDamage + trueDamage
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
}