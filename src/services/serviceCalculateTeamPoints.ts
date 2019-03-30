import { IStateTeams } from "../states/StateTeams";
import { IStateCapturePoints } from "../states/StateCapturePoints";

export function calculateTeamPoints(stateTeams: IStateTeams, stateCapturePoints: IStateCapturePoints): void {
    for (let keyCapturePoint in stateCapturePoints.capturePoints) {
        var capturePoint = stateCapturePoints.capturePoints[keyCapturePoint]
        if (capturePoint.takenTo >= 50) {
            var team = stateTeams.teams[capturePoint.team]
            team.score = team.score + capturePoint.scorePoints
        }
    }
}