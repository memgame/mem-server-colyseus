import { BaseEntity } from "./BaseEntitiy";
import { type } from "@colyseus/schema";
import { Position } from "../models/position";

export class Building extends BaseEntity {
    @type(Position) public position: Position
    @type('number') public size: number
    @type('string') public buildingType: BuildingType;
}

export enum BuildingType {
    Tree1 = 'Tree1',
    House1 = 'House1'
  }