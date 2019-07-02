import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";

export function systemUnitsRotateToTarget (units: MapSchema<Unit>): void {
    for (let key in units) {
        var unit: Unit = units[key]

        if (unit.target == null) continue

        unit.setRotation(unit.target.position.x, unit.target.position.z)
    }
}