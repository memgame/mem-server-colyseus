"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const lerp_1 = require("../utility/lerp");
const vector2_1 = require("../utility/vector2");
function movePlayers(state, deltaTime) {
    for (let key in state.players) {
        var player = state.players[key];
        if (player.moveTo == null) {
            continue;
        }
        var playerPosition = player.position;
        var playerPositionMoveTo = player.moveTo;
        var distance = vector2_1.distanceBetween(playerPosition.x, playerPosition.z, playerPositionMoveTo.x, playerPositionMoveTo.z);
        var isPlayerAtDestination = distance == 0;
        if (isPlayerAtDestination) {
            player.moveTo = null;
            player.locomationAnimationSpeedPercent = 0;
            continue;
        }
        var moveSpeedPerSec = new bignumber_js_1.default(player.moveSpeed).dividedBy(60).toNumber();
        var distanceToTravel = new bignumber_js_1.default(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber();
        var t = new bignumber_js_1.default(distanceToTravel).dividedBy(distance).toNumber();
        //Clamp
        t = Math.min(Math.max(0, t), 1);
        player.position.x = lerp_1.lerp(playerPosition.x, playerPositionMoveTo.x, t);
        player.position.z = lerp_1.lerp(playerPosition.z, playerPositionMoveTo.z, t);
        player.locomationAnimationSpeedPercent = 0.6;
    }
}
exports.movePlayers = movePlayers;
