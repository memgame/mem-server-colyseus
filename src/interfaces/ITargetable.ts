import { Position } from "../models/position";
import { Schema } from "@colyseus/schema";

export interface ITargetable extends Schema {
    position: Position
}