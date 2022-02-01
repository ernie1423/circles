import { Entity } from 'Entity';

let entities: Entity[] = [];

setInterval(() => {
    for(let entity of entities){
        entity.update();
    }
}, 1000/60)