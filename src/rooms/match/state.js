"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../../models/player");
const serviceLoadMap_1 = require("../../services/serviceLoadMap");
class State {
    constructor(map) {
        this.players = {};
        this.teams = {};
        this.capturePoints = {};
        serviceLoadMap_1.loadMap(this, map);
    }
    addPlayer(client, options) {
        var player = new player_1.Player(client.sessionId);
        player.name = options.name;
        var keysTeams = Object.keys(this.teams);
        player.team = keysTeams[Math.floor(Math.random() * keysTeams.length)];
        this.players[client.sessionId] = player;
        console.log(this.players);
        console.log('added player');
    }
    removePlayer(client) {
        delete this.players[client.sessionId];
        console.log('removed player');
    }
}
exports.State = State;
