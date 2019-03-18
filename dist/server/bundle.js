(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
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
const port = Number(process.env.PORT);
console.log("the fucking port is: ", port);
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

});
___scope___.file("rooms/match/index.js", function(exports, require, module, __filename, __dirname){

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

});
___scope___.file("rooms/match/state.js", function(exports, require, module, __filename, __dirname){

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

});
___scope___.file("models/player.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const position_1 = require("./../models/position");
const colyseus_1 = require("colyseus");
class Player {
    constructor(id) {
        this.id = id;
        this.position = new position_1.Position(125, 0, 125);
        this.rotation = 0;
        this.moveSpeed = 300;
    }
}
__decorate([
    colyseus_1.nosync
], Player.prototype, "moveTo", void 0);
exports.Player = Player;

});
___scope___.file("models/position.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Position {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
exports.Position = Position;

});
___scope___.file("services/serviceLoadMap.js", function(exports, require, module, __filename, __dirname){

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

});
___scope___.file("models/team.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(id) {
        this.id = id;
    }
}
exports.Team = Team;

});
___scope___.file("models/capturePoint.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CapturePoint {
    constructor(id) {
        this.id = id;
    }
}
exports.CapturePoint = CapturePoint;

});
___scope___.file("maps/map1.json", function(exports, require, module, __filename, __dirname){


});
___scope___.file("services/serviceCalculateTeamPoints.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateTeamPoints(state) {
    for (let keyCapturePoint in state.capturePoints) {
        var capturePoint = state.capturePoints[keyCapturePoint];
        if (capturePoint.takenTo >= 50) {
            var team = state.teams[capturePoint.team];
            team.score = team.score + capturePoint.scorePoints;
        }
    }
}
exports.calculateTeamPoints = calculateTeamPoints;

});
___scope___.file("services/serviceCalculateCapturePoints.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector2_1 = require("../utility/vector2");
function calculateCapturePoints(state) {
    for (let keyPlayer in state.players) {
        var player = state.players[keyPlayer];
        for (let keyCapturePoint in state.capturePoints) {
            var capturePoint = state.capturePoints[keyCapturePoint];
            var distanceToPlayer = vector2_1.distanceBetween(player.position.x, player.position.z, capturePoint.position.x, capturePoint.position.z);
            var isPlayerInCapturePoint = distanceToPlayer < capturePoint.radius;
            if (isPlayerInCapturePoint) {
                if (capturePoint.team == null) {
                    capturePoint.takenTo = capturePoint.takenTo + 1;
                    capturePoint.team = player.team;
                }
                else if (capturePoint.team == player.team) {
                    capturePoint.takenTo = capturePoint.takenTo + 1;
                }
                else if (capturePoint.team != player.team) {
                    capturePoint.takenTo = capturePoint.takenTo - 1;
                    if (capturePoint.takenTo <= 0) {
                        capturePoint.team = null;
                    }
                }
            }
        }
    }
    for (let key in state.capturePoints) {
        var capturePoint = state.capturePoints[key];
        if (capturePoint.takenTo > 100) {
            capturePoint.takenTo = 100;
        }
    }
}
exports.calculateCapturePoints = calculateCapturePoints;

});
___scope___.file("utility/vector2.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = __importDefault(require("bignumber.js"));
function distanceBetween(currentPostionX, currentPostionY, targetPositionX, targetPositionY) {
    var a = new bignumber_js_1.default(currentPostionX).minus(targetPositionX);
    var b = new bignumber_js_1.default(currentPostionY).minus(targetPositionY);
    var aProduct = a.multipliedBy(a);
    var bProduct = b.multipliedBy(b);
    var abSum = aProduct.plus(bProduct);
    var distance = abSum.sqrt().toNumber();
    return distance;
}
exports.distanceBetween = distanceBetween;

});
___scope___.file("services/serviceMovePlayers.js", function(exports, require, module, __filename, __dirname){

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

});
___scope___.file("utility/lerp.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lerp(currentPosition, targetPosition, t) {
    return currentPosition + t * (targetPosition - currentPosition);
}
exports.lerp = lerp;

});
___scope___.file("rooms/match/actionType.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//A
//B
//C
//D
//E
//F
//G
//H
//I
//J
//K
//L
//M
exports.MOVE_PLAYER_TO = 'MOVE_PLAYER_TO';
//N
//O
//P
//Q
//R
//S
//T
//U
//V
//W
//X
//Y
//Z

});
return ___scope___.entry = "index.js";
});

FuseBox.import("default/index.js");
FuseBox.main("default/index.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((m||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),f=e.substring(o+1);return[a,f]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(m){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function f(e){return{server:require(e)}}function u(e,n){var o=n.path||"./",a=n.pkg||"default",u=r(e);if(u&&(o="./",a=u[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=u[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!m&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return f(e);var s=x[a];if(!s){if(m&&"electron"!==_.target)throw"Package not found "+a;return f(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,d=t(o,e),c=i(d),p=s.f[c];return!p&&c.indexOf("*")>-1&&(l=c),p||l||(c=t(d,"/","index.js"),p=s.f[c],p||"."!==d||(c=s.s&&s.s.entry||"index.js",p=s.f[c]),p||(c=d+".js",p=s.f[c]),p||(p=s.f[d+".jsx"]),p||(c=d+"/index.jsx",p=s.f[c])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:d,validPath:c}}function s(e,r,n){if(void 0===n&&(n={}),!m)return r(/\.(js|json)$/.test(e)?h.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);_.dynamic(a,o),r(_.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=y[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function d(e){if(null!==e&&["function","object","array"].indexOf(typeof e)!==-1&&!e.hasOwnProperty("default"))return Object.isFrozen(e)?void(e.default=e):void Object.defineProperty(e,"default",{value:e,writable:!0,enumerable:!1})}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=u(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),f=x[t.pkgName];if(f){var p={};for(var v in f.f)a.test(v)&&(p[v]=c(t.pkgName+"/"+v));return p}}if(!i){var g="function"==typeof r,y=l("async",[e,r]);if(y===!1)return;return s(e,function(e){return g?r(e):null},r)}var w=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var b=i.locals={},j=n(t.validPath);b.exports={},b.module={exports:b.exports},b.require=function(e,r){var n=c(e,{pkg:w,path:j,v:t.versions});return _.sdep&&d(n),n},m||!h.require.main?b.require.main={filename:"./",paths:[]}:b.require.main=h.require.main;var k=[b.module.exports,b.require,b.module,t.validPath,j,w];return l("before-import",k),i.fn.apply(k[0],k),l("after-import",k),b.module.exports}if(e.FuseBox)return e.FuseBox;var p="undefined"!=typeof ServiceWorkerGlobalScope,v="undefined"!=typeof WorkerGlobalScope,m="undefined"!=typeof window&&"undefined"!=typeof window.navigator||v||p,h=m?v||p?{}:window:global;m&&(h.global=v||p?{}:window),e=m&&"undefined"==typeof __fbx__dnm__?e:module.exports;var g=m?v||p?{}:window.__fsbx__=window.__fsbx__||{}:h.$fsbx=h.$fsbx||{};m||(h.require=require);var x=g.p=g.p||{},y=g.e=g.e||{},_=function(){function r(){}return r.global=function(e,r){return void 0===r?h[e]:void(h[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){y[e]=y[e]||[],y[e].push(r)},r.exists=function(e){try{var r=u(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=u(e,{}),n=x[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=x.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(x[e])return n(x[e].s);var t=x[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=x,r.isBrowser=m,r.isServer=!m,r.plugins=[],r}();return m||(h.FuseBox=_),e.FuseBox=_}(this))