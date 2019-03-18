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
