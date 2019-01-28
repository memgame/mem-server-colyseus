import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Import Rooms
import { Match } from "./rooms/match";

const port = Number(process.env.PORT || 8080);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
    server: httpServer,
    verifyClient: (info, next) => {
        // validate 'info'
        //
        // - next(false) will reject the websocket handshake
        // - next(true) will accept the websocket handshake
        next(true)
    }
});

// Register Rooms
gameServer.register("match", Match);

gameServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);
