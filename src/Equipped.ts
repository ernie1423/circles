import { Entity } from './Entity';
import { Inventory } from './Inventory';
import { Item } from './Item';
import { clamp } from './utils';

type ControlCapacity = { [name: string]: { max: number, current: number } };

/**
 * Инвентарь, изменённый под экипировку предметов.
 */
class Equipped<C extends ControlCapacity = ControlCapacity> extends Inventory {
    protected entity!: Entity;

    cooldown: {
        current: number,
        max: number
    }

    control: C

    constructor(entity: Entity, controlCapacity: C){
        super(entity);

        this.cooldown = {
            current: 0,
            max: 60
        }

        this.control = controlCapacity;
    }

    update(){
        let { cooldown: cd } = this;

        this.cooldown.current = clamp(cd.current - 1, { min: 0, max: cd.max });

        this.items.forEach((item, i) => {
            if(item.beingRemoved)
                this.items.splice(i, 1);  
        })
    }

    /**
     * Добавить предмет(ы) в экипированные.
     */
    add(...items: Item[]) {
        if(this.cooldown.current == 0){
            this.cooldown.current = this.cooldown.max;

            items.forEach((item) => {
                if(!this.entity.inventory?.items.includes(item)) return;
        
                let { control } = this;
                let added = true;

                if(item.controlCost)
                    Object.entries(item.controlCost).forEach(([category, cost]) => {
                        if(category in control){
                            if(cost + control[category].current > control[category].max){
                                added = false;
                            }
                        }
                        else {
                            added = false;
                        }
                    })
    
                if(added){
                    Object.entries(item.controlCost).forEach(([category, cost]) => {
                        control[category].current += cost;
                    })
    
                    super.add(item);
                }
            });
        }
    }

    /**
     * Убрать предмет из экипированных.
     */
    remove(item: Item){
        Object.entries(item.controlCost).forEach(([category, value]) => {
            this.control[category].current -= value;
        })
        
        super.remove(item);
    }
}

export {
    Equipped,
    ControlCapacity
}