import { Entity } from 'Entity';

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

        this.entities.forEach((entity, i) => {
            if(entity.beingRemoved){
                this.entities.splice(i, 1);
            }
        })
    }
}

export {
    Layer
}