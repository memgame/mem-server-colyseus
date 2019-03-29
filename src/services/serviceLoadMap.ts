import { IStatePlayers } from "../rooms/IStatePlayers";
import { IStateTeams } from "../rooms/IStateTeams";
import { IStateCapturePoints } from "../rooms/IStateCapturePoints";
import { Team } from "../models/team";
import { CapturePoint } from "../models/capturePoint";
import { Position } from "../models/position";
import { IStateRoot } from "../states/StateRoot";

export function loadMap(state: IStateRoot, map: any) {
    map.teams.forEach(obj => {
        var team = new Team(obj.id)
        team.color = obj.color
        team.score = obj.score
        state.stateTeams.addTeam(team)
    });
    map.capturePoints.forEach(obj => {
        var capturePoint = new CapturePoint(obj.id)
        capturePoint.isSpawn = obj.isSpawn
        capturePoint.position = new Position(obj.position.x, obj.position.y, obj.position.z)
        capturePoint.radius = obj.radius
        capturePoint.team = obj.team
        capturePoint.takenTo = obj.takenTo
        capturePoint.scorePoints = 1
        state.stateCapturePoints.addCapturePoint(capturePoint)
    })
    console.log('loaded map')
}