import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";
import { distanceBetween } from "../utility/vector2";

export function systemUnitsTargetCheck (units: MapSchema<Unit>) {
    for (let key in units) {
        var unit: Unit = units[key]

        if (unit.target == null) continue

        if (!unit.target.isAlive) {
            unit.setTarget(null)
        }

        if (unit.target) {
            var distanceToTarget = distanceBetween(unit.position.x, unit.position.z, unit.target.position.x, unit.target.position.z)
            
            if (!!unit.mainHand && distanceToTarget > unit.mainHand.attackRange) {
                unit.setMoveTo(unit.target.position.x, unit.target.position.y, unit.target.position.z)
            } else {
                unit.moveTo = null
            }
        }

    }
}