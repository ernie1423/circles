import { Behavior } from './Behavior';
import { Entity } from './Entity';

class BehaviorInterface<E extends Entity> {
    entity: E;
    behavior?: Behavior<E>;

    constructor(entity: E, behavior?: Behavior<E>){
        this.entity = entity;
        this.behavior = behavior;
    }

    update(){
        this.behavior?.update();
    }
}

export {
    BehaviorInterface
}