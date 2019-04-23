import { Position } from "./position";
import { Schema } from "@colyseus/schema";

export interface ITargetable extends Schema {
    position: Position
}