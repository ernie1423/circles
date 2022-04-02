import { Behavior } from './Behavior';
import { Entity } from './Entity';
import { ItemData } from './Item';

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

    getItems(): ItemData[] | null {
        if(this.entity.inventory !== undefined)
            return this.entity.inventory.items.map(item => item.data());

        else return null;
    }

    getItem(id: string): ItemData | null {
        if(this.entity.inventory !== undefined){
            let item = this.entity.inventory.items.find(item => item.id == id);

            if(item)
                return item.data();
            
            else return null;
        }
        else return null;
    }
}

export {
    BehaviorInterface
}