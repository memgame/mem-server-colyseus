import { Schema, type } from "@colyseus/schema";

export class Weapon extends Schema {
    @type('string')
    public weaponType: WeaponType

    @type('string')
    public weaponSlot: WeaponSlot

    @type('string')
    public combatStyle: CombatStyle

    @type('number')
    public attackRange: number
}

enum WeaponType {
    Axe = 'Axe',
    Sword = 'Sword',
    Spear = 'Spear',
    Bow = 'Bow',
    Daggers = 'Daggers',
    Shield = 'Shield',
}

enum WeaponSlot {
    OneHanded = 'OneHanded',
    TwoHanded = 'TwoHanded',
    OffHand = 'OffHand'
}

enum CombatStyle {
    Melee = 'Melee',
    Ranged = 'Ranged'
}