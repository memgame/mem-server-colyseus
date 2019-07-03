import { distanceBetween } from "../utility/vector2";
import { IStateCapturePoints } from "../states/StateCapturePoints";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";
import { MapSchema } from "@colyseus/schema";
import { Unit } from "../entities/unit";

export function systemCalculateCapturePoints (stateCapturePoints: IStateCapturePoints, statePlayers: IStatePlayers, units: MapSchema<Unit>): void {
    for (let keyPlayer in statePlayers.players) {
        const player: Player = statePlayers.players[keyPlayer]
        const unit: Unit = units[player.unitId]
        if(!unit.isAlive) continue

        for (let keyCapturePoint in stateCapturePoints.capturePoints) {
            var capturePoint = stateCapturePoints.capturePoints[keyCapturePoint]

            var distanceToUnit = distanceBetween(unit.position.x, unit.position.z, capturePoint.position.x, capturePoint.position.z)
            var isUnitInCapturePoint = distanceToUnit < capturePoint.radius

            if (isUnitInCapturePoint) {
                if (capturePoint.team == null) {
                    capturePoint.takenTo = capturePoint.takenTo + 1
                    capturePoint.team = unit.team
                } else if (capturePoint.team == unit.team) {
                    capturePoint.takenTo = capturePoint.takenTo + 1
                } else if (capturePoint.team != unit.team) {
                    capturePoint.takenTo = capturePoint.takenTo - 1
                    if (capturePoint.takenTo <= 0) {
                        capturePoint.team = null
                    }
                }
            }
        }
    }
    for (let key in stateCapturePoints.capturePoints) {
        var capturePoint = stateCapturePoints.capturePoints[key]
        if(capturePoint.takenTo > 100) {
            capturePoint.takenTo = 100
        }
    }
}