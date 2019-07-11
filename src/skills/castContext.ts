import { Unit } from '../entities/unit'
import { Position } from '../models/position';

export class CastContext {
    public level: number
    public caster: Unit
    public location: Position
    public target: Unit
}