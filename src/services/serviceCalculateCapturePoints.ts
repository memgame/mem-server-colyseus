import { IStatePlayers } from "../rooms/IStatePlayers";
import { IStateCapturePoints } from "../rooms/IStateCapturePoints"

export function calculateCapturePoints (state: IStateCapturePoints & IStatePlayers ) {
    for (let key in state.players) {
        //TODO check if player is in a capture point if so increase tick
    }

}