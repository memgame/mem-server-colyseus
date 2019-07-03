import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";

export function systemUnitsEnergyRegeneration (units: MapSchema<Unit>): void {
    for(let key in units) {
        var unit: Unit = units[key]
        if (!unit.energy) continue
        unit.addEnergy(unit.energy.regenerationSpeed)
    }
}