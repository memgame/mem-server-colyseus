import { Schema, type, MapSchema } from "@colyseus/schema"
import { BaseEntity } from "../entities/BaseEntitiy";

export class StateEntities extends Schema implements IStateEntities {
    @type({ map: BaseEntity })
    entities: MapSchema<BaseEntity> = new MapSchema<BaseEntity>();
    
    public addEntity (entity: BaseEntity): void {
        this.entities[entity.id] = entity
        console.log('added entity')
    }

    public removeEntity (entityId: string): void {
        delete this.entities[entityId]
        console.log('removed entity')
    }
}

export interface IStateEntities extends Schema {
    entities: MapSchema<BaseEntity>

    addEntity (entity: BaseEntity): void
    removeEntity (entityId: string): void
}