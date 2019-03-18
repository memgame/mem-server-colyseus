"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lerp(currentPosition, targetPosition, t) {
    return currentPosition + t * (targetPosition - currentPosition);
}
exports.lerp = lerp;
