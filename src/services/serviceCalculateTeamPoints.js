"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateTeamPoints(state) {
    for (let keyCapturePoint in state.capturePoints) {
        var capturePoint = state.capturePoints[keyCapturePoint];
        if (capturePoint.takenTo >= 50) {
            var team = state.teams[capturePoint.team];
            team.score = team.score + capturePoint.scorePoints;
        }
    }
}
exports.calculateTeamPoints = calculateTeamPoints;
