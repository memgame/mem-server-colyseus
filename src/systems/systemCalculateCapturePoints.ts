import { distanceBetween } from "../utility/vector2";
import { IStateCapturePoints } from "../states/StateCapturePoints";
import { IStatePlayers } from "../states/StatePlayers";
import { Player } from "../models/player";

export function systemCalculateCapturePoints (stateCapturePoints: IStateCapturePoints, statePlayers: IStatePlayers): void {
    for (let keyPlayer in statePlayers.players) {
        var player: Player = statePlayers.players[keyPlayer]

        if(!player.isAlive) continue

        for (let keyCapturePoint in stateCapturePoints.capturePoints) {
            var capturePoint = stateCapturePoints.capturePoints[keyCapturePoint]

            var distanceToPlayer = distanceBetween(player.position.x, player.position.z, capturePoint.position.x, capturePoint.position.z)
            var isPlayerInCapturePoint = distanceToPlayer < capturePoint.radius

            if (isPlayerInCapturePoint) {
                if (capturePoint.team == null) {
                    capturePoint.takenTo = capturePoint.takenTo + 1
                    capturePoint.team = player.team
                } else if (capturePoint.team == player.team) {
                    capturePoint.takenTo = capturePoint.takenTo + 1
                } else if (capturePoint.team != player.team) {
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