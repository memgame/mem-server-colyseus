import { Position } from './../models/position';

export class Player {
    public id: string;

    public position: Position;

    public health: number;
    public energy: number;

    public attackDamage: number;
    public attackSpeedPercent: number;
    public critChancePercent: number;
    public critBonusPercent: number;

    public abilityPower: number;
    public cooldownReductionPercent: number;

    public armor: number;
    public magicResistance: number;

    public moveSpeed: number;

    public lifestealPercent: number;
    public spellvampPercent: number;

    constructor(

    ) {

    }
}