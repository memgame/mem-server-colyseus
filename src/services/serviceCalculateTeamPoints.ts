import { IStateTeams } from "../rooms/IStateTeams";
import { IStateCapturePoints } from "../rooms/IStateCapturePoints";

export function calculateTeamPoints(state: IStateTeams & IStateCapturePoints) {
    console.log(state)
    console.log('calculate team points')
    for (let keyCapturePoint in state.capturePoints) {
        var capturePoint = state.capturePoints[keyCapturePoint]
        if (capturePoint.takenTo >= 50) {
            for (let keyTeam in state.teams) {
                var team = state.teams[keyTeam]
                if(capturePoint.team == team.id && capturePoint.scorePoints) {
                    team.score = team.score + capturePoint.scorePoints
                }
            }
        }
    }
}