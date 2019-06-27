import { Schema, type } from "@colyseus/schema";

export class Weapon extends Schema {
    @type('string')
    public id: string

    @type('string')
    public type: WeaponType

    @type('string')
    public slot: WeaponSlot

    @type('string')
    public combatStyle: CombatStyle

    @type('number')
    public attackRange: number

    @type('number')
    public attackSpeed: number

    constructor (
        id: string
    ) {
        super()
        this.id = id
    }
}

export enum WeaponType {
    Sword = 'Sword',
    Spear = 'Spear',
    Bow = 'Bow',
    Daggers = 'Daggers',
    Shield = 'Shield',
}

export enum WeaponSlot {
    OneHanded = 'OneHanded',
    TwoHanded = 'TwoHanded',
    OffHand = 'OffHand'
}

export enum CombatStyle {
    Melee = 'Melee',
    Ranged = 'Ranged'
}