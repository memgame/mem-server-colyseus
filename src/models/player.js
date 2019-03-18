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
