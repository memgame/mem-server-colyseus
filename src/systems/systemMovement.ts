import BigNumber from "bignumber.js"
import { lerp } from "../utility/lerp";
import { distanceBetween } from "../utility/vector2";
import { IMoveable } from "../interfaces/IMoveable";
import { clamp } from "../utility/clamp";
import { Unit } from "../entities/unit";

export function systemMovementUnits(units: any, deltaTime: number): void {
    for (let key in units) {
        const unit: Unit = units[key]
        moveEntity(unit, deltaTime)
    }
}

function moveEntity (entity: IMoveable, deltaTime: number): void {
    if(!entity.isAlive) {
        entity.locomationAnimationSpeedPercent = 0
        entity.moveTo = null
        return
    }

    if(entity.moveTo == null) {
        entity.locomationAnimationSpeedPercent = 0
        return
    }

    const distance = distanceBetween(entity.position.x, entity.position.z, entity.moveTo.x, entity.moveTo.z)
    const isEntityAtDestination = distance == 0

    if (isEntityAtDestination) {
        entity.moveTo = null
        return
    }

    const moveSpeedPerSec = new BigNumber(entity.moveSpeed).dividedBy(60).toNumber()
    const distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()
    const t = clamp(new BigNumber(distanceToTravel).dividedBy(distance).toNumber(), 0, 1)
    entity.position.x = lerp(entity.position.x, entity.moveTo.x, t)
    entity.position.z = lerp(entity.position.z, entity.moveTo.z, t)
    entity.locomationAnimationSpeedPercent = 0.6
}