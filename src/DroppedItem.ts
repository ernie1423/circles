import { Entity } from './Entity';
import { Item } from './Item';
import { Layer } from './Layer';

class DroppedItem<I extends Item> extends Entity {
    health: {
        current: number
        max?: number,
    }

    charge: I["charge"];
    
    item: I;

    state: I["state"];

    constructor(x: number, y: number, layer: Layer, item: I){
        super(x, y, layer);

        this.health = item.durability;

        this.item = item;
        this.charge = item.charge;
        this.state = item.state;
    }

    interact(sender: Entity){
        if(!this.beingRemoved){
            this.beingRemoved = true;
            this.item.beingRemoved = false;
            sender.inventory?.push(this.item);
        }
    }
}

export {
    DroppedItem
}