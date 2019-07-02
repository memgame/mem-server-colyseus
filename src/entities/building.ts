import { BaseEntitiy } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";

export class Building extends BaseEntitiy {
    @type(Position) public position: Position
    @type('number') public size: number
    @type('string') buildingType: BuildingType;
}

export enum BuildingType {
    Tree1 = 'Tree1',
    House1 = 'House1'
  }