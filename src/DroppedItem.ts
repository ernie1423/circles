import { Entity } from './Entity';
import { Item } from './Item';
import { Layer } from './Layer';

/**
 * Сущность, отражающая отдельный предмет.
 */
class DroppedItem<I extends Item> extends Entity {

    /**
     * Наименование вида
     * * может помочь клиенту визуализировать отдельные предметы по-разному
     * * может помочь ИИ распознавать предметы легче
     */
    readonly name: string = 'dropped-item';

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

    /**
     * Подобрать предмет.
     */
    interact(sender: Entity){
        if(!this.beingRemoved){
            this.beingRemoved = true;
            this.item.beingRemoved = false;
            sender.inventory?.add(this.item);
        }
    }
}

export {
    DroppedItem
}