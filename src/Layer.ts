import { Entity } from './Entity';
import { id, multiForEach } from './utils';

class Layer {
    id: string;

    /**
     * 
     */
    newEntities: Entity[];
    entities: Entity[];

    constructor(){
        this.newEntities = [];
        this.entities = [];

        this.id = id();
    }

    interact(){

    }

    add(entity: Entity){
        if(!this.newEntities.includes(entity))
            this.newEntities.push(entity);
    }
    
    update(){
        this.entities.push(...this.newEntities);
        this.newEntities = [];

        multiForEach(this.entities,
            (entity, i) => {
                if(entity.beingRemoved){
                    this.entities.splice(i, 1);
                }
            },
            (entity) => {
                entity.updateBehavior()
            },
            (entity) => {
                entity.updateAbilities()
                entity.updateInventory()
            },
            (entity) => {
                entity.updateAttributes()
            },
            (entity) => {
                entity.updateEffects()
                entity.updateStats();
            },
        )
    }
}

export {
    Layer
}