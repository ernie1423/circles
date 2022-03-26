import { Entity } from 'Entity';
import { multiForEach } from 'utils';

class Layer {
    newEntities: Entity[];
    entities: Entity[];

    constructor(){
        this.newEntities = [];
        this.entities = [];
    }

    interact(){

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
                entity.updateController()
            },
            (entity) => {
                entity.updateAbilities()
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