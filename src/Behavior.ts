import { BehaviorInterface } from './BehaviorInterface';
import { Entity } from './Entity';

/**
 * Отражает поведение сущности. Можно считать это как алгоритм, который может выполнять действия, данные интерфейсом. Можно заменить.
 */
class Behavior<E extends Entity> {
    /**
     * Интерфейс поведения
     */
    behaviorInterface: BehaviorInterface<E>
    
    constructor(behaviorInterface: BehaviorInterface<E>){
        this.behaviorInterface = behaviorInterface;
    }

    /**
     * Вызывается после каждого обновления интерфейса
     */
    update(){
        
    }
}

export {
    Behavior
}