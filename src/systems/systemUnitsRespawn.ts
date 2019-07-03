import { Position } from "../models/position";
import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";

export function systemUnitsRespawn (units: MapSchema<Unit>) {
    console.log('system respawn')
    for(let key in units) {
        var unit: Unit = units[key]

        if (unit.isAlive) continue

        if (!unit.health) continue
        
        unit.health.current = unit.health.max
        unit.position = new Position(125, 0 , 125)
        unit.isAlive = true
    }
}