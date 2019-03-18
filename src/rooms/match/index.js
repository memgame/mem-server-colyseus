"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colyseus_1 = require("colyseus");
const state_1 = require("./state");
const map1_json_1 = __importDefault(require("../../maps/map1.json"));
const serviceCalculateTeamPoints_1 = require("../../services/serviceCalculateTeamPoints");
const serviceCalculateCapturePoints_1 = require("../../services/serviceCalculateCapturePoints");
const serviceMovePlayers_1 = require("../../services/serviceMovePlayers");
const actionType_1 = require("./actionType");
const position_1 = require("../../models/position");
class Match extends colyseus_1.Room {
    // When room is initialized
    onInit(options) {
        this.setState(new state_1.State(map1_json_1.default));
        this.setPatchRate(1000 / 30);
        this.setSimulationInterval(() => this.update());
        console.log('new room');
        this.clock.setInterval(() => serviceCalculateCapturePoints_1.calculateCapturePoints(this.state), 5000);
        this.clock.setInterval(() => serviceCalculateTeamPoints_1.calculateTeamPoints(this.state), 10000);
    }
    // Checks if a new client is allowed to join. (default: `return true`)
    requestJoin(options, isNew) {
        console.log('-------------');
        console.log('request join');
        console.log(options);
        return true;
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('-------------');
            console.log('on auth');
            console.log(options);
            const userData = { name: 'SomeUserName' };
            return userData ? userData : false;
        });
    }
    // When client successfully join the room
    onJoin(client, options, auth) {
        console.log('-------------');
        console.log('on join');
        console.log(client.id);
        console.log(options);
        console.log(auth);
        this.state.addPlayer(client, {
            name: auth.name
        });
    }
    // When a client sends a message
    onMessage(client, message) {
        console.log(client.sessionId);
        console.log(message);
        if (message.ACTION_TYPE == actionType_1.MOVE_PLAYER_TO) {
            var player = this.state.players[client.sessionId];
            this.state.players[client.sessionId].moveTo = new position_1.Position(message.payload.x, 0, message.payload.z);
            var angle = (Math.atan2(player.moveTo.x - player.position.x, player.moveTo.z - player.position.z) * (180 / Math.PI));
            if (angle < 0) {
                angle = angle + 360;
            }
            player.rotation = angle;
        }
    }
    // When a client leaves the room
    onLeave(client, consented) {
        this.state.removePlayer(client);
    }
    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() {
        console.log('closed match room');
    }
    update() {
        serviceMovePlayers_1.movePlayers(this.state, this.clock.deltaTime);
    }
}
exports.Match = Match;
