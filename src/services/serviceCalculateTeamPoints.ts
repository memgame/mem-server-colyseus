import { IStateTeams } from "../rooms/IStateTeams";
import { IStateCapturePoints } from "../rooms/IStateCapturePoints";

export function calculateTeamPoints(state: IStateTeams & IStateCapturePoints) {
    console.log(state)
    console.log('calculate team points')
}