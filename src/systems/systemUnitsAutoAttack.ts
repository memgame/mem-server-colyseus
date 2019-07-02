import { distanceBetween } from "../utility/vector2";
import { Room } from "colyseus";
import { Unit } from "../entities/unit";
import { MapSchema } from "@colyseus/schema";

export function systemUnitsAutoAttack (units: MapSchema<Unit>, elapsedTime: number, room: Room): void {
    for (let key in units) {
        var unit: Unit = units[key]

        if (unit.target == null) continue

        if (!unit.mainHand) continue

        if (!unit.target.isAlive) continue

        var isAutoAttackReady = unit.lastAutoAttack <= (elapsedTime - unit.mainHand.attackSpeed)

        if (!isAutoAttackReady) continue

        var distanceToTarget = distanceBetween(unit.position.x, unit.position.z, unit.target.position.x, unit.target.position.z)
        var isTargetInAutoAttackDistance = distanceToTarget <= unit.mainHand.attackRange

        if (!isTargetInAutoAttackDistance) continue

        console.log('--------------------')
        console.log('auto attack')

        room.broadcast({
            ACTION_TYPE: 'AUTO_ATTACK',
            payload: {
                unitId: unit.id
            }
        })

        unit.target.hit(unit.attributes.attackDamage, 0, 0)

        unit.lastAutoAttack = elapsedTime


        console.log('--------------------')
    }
}