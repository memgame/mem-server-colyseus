"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector2_1 = require("../utility/vector2");
function calculateCapturePoints(state) {
    for (let keyPlayer in state.players) {
        var player = state.players[keyPlayer];
        for (let keyCapturePoint in state.capturePoints) {
            var capturePoint = state.capturePoints[keyCapturePoint];
            var distanceToPlayer = vector2_1.distanceBetween(player.position.x, player.position.z, capturePoint.position.x, capturePoint.position.z);
            var isPlayerInCapturePoint = distanceToPlayer < capturePoint.radius;
            if (isPlayerInCapturePoint) {
                if (capturePoint.team == null) {
                    capturePoint.takenTo = capturePoint.takenTo + 1;
                    capturePoint.team = player.team;
                }
                else if (capturePoint.team == player.team) {
                    capturePoint.takenTo = capturePoint.takenTo + 1;
                }
                else if (capturePoint.team != player.team) {
                    capturePoint.takenTo = capturePoint.takenTo - 1;
                    if (capturePoint.takenTo <= 0) {
                        capturePoint.team = null;
                    }
                }
            }
        }
    }
    for (let key in state.capturePoints) {
        var capturePoint = state.capturePoints[key];
        if (capturePoint.takenTo > 100) {
            capturePoint.takenTo = 100;
        }
    }
}
exports.calculateCapturePoints = calculateCapturePoints;
