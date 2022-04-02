import { Behavior } from './Behavior';
import { Entity } from './Entity';
import { Item, ItemData } from './Item';

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

    useItem<I extends Item = Item>(id: string, data: Parameters<I['use']>[0]): boolean {
        if(this.entity.inventory !== undefined){
            let item = this.entity.inventory.items.find(item => item.id == id);

            if(item){
                item.use(data);
                return true;
            }
            else return false;
        }
        else return false;
    }
}

export {
    BehaviorInterface
}