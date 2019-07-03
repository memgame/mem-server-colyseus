import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";

export function systemUnitsHealthRegeneration (units: MapSchema<Unit>): void {
    for(let key in units) {
        var unit: Unit = units[key]
        if (!unit.health) continue
        unit.heal(unit.health.regenerationSpeed)
    }
}