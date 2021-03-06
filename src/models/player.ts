import { Position } from './../models/position';
import { nosync } from 'colyseus';

export class Player {
    public id: string;

    public name: string;

    public team: string;

    public isAlive: boolean;

    public position: Position;
    public rotation: number;
    public moveSpeed: number;
    public locomationAnimationSpeedPercent: number;

    @nosync
    public moveTo: Position;

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

    public lifestealPercent: number;
    public spellvampPercent: number;

    constructor(
        id: string
    ) {
        this.id = id
        this.position = new Position(125, 0, 125)
        this.rotation = 0
        this.moveSpeed = 300
    }
}