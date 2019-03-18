"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const http_1 = require("http");
const colyseus_1 = require("colyseus");
// Import Rooms
const match_1 = require("./rooms/match");
const port = Number(process.env.PORT || 8080);
const app = express;
// Create HTTP Server
const httpServer = http_1.createServer(app);
// Attach WebSocket Server on HTTP Server.
const gameServer = new colyseus_1.Server({
    server: httpServer,
    verifyClient: (info, next) => {
        // validate 'info'
        //
        // - next(false) will reject the websocket handshake
        // - next(true) will accept the websocket handshake
        next(true);
    }
});
// Register Rooms
gameServer.register("match", match_1.Match);
gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
