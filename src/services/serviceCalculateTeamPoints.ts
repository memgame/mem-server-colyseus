import { IStateTeams } from "../rooms/IStateTeams";
import { IStateCapturePoints } from "../rooms/IStateCapturePoints";

export function calculateTeamPoints(state: IStateTeams & IStateCapturePoints) {
    for (let keyCapturePoint in state.capturePoints) {
        var capturePoint = state.capturePoints[keyCapturePoint]
        if (capturePoint.takenTo >= 50) {
            var team = state.teams[capturePoint.team]
            team.score = team.score + capturePoint.scorePoints
        }
    }
}