import { Schema, type, MapSchema } from "@colyseus/schema"
import { Unit } from "../entities/unit";

export class StateUnits extends Schema implements IStateUnits {
    @type({ map: Unit }) public units: MapSchema<Unit> = new MapSchema<Unit>();
    
    public addUnit (unit: Unit): void {
        this.units[unit.id] = unit
        console.log('added entity')
    }

    public removeUnit (unitId: string): void {
        delete this.units[unitId]
        console.log('removed entity')
    }
}

export interface IStateUnits extends Schema {
    units: MapSchema<Unit>

    addUnit (unit: Unit): void
    removeUnit (unitId: string): void
}