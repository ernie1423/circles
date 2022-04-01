import { BehaviorInterface } from './BehaviorInterface';
import { Entity } from './Entity';

/**
 * 
 */
class Behavior<E extends Entity> {
    behaviorInterface: BehaviorInterface<E>
    
    constructor(behaviorInterface: BehaviorInterface<E>){
        this.behaviorInterface = behaviorInterface;
    }

    update(){
        
    }
}

export {
    Behavior
}