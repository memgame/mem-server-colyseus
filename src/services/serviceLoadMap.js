"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const team_1 = require("../models/team");
const capturePoint_1 = require("../models/capturePoint");
const position_1 = require("../models/position");
function loadMap(state, map) {
    map.teams.forEach(obj => {
        var team = new team_1.Team(obj.id);
        team.color = obj.color;
        team.score = obj.score;
        state.teams[team.id] = team;
    });
    map.capturePoints.forEach(obj => {
        var capturePoint = new capturePoint_1.CapturePoint(obj.id);
        capturePoint.isSpawn = obj.isSpawn;
        capturePoint.position = new position_1.Position(obj.position.x, obj.position.y, obj.position.z);
        capturePoint.radius = obj.radius;
        capturePoint.team = obj.team;
        capturePoint.takenTo = obj.takenTo;
        capturePoint.scorePoints = 1;
        state.capturePoints[capturePoint.id] = capturePoint;
    });
}
exports.loadMap = loadMap;
