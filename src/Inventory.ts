import { Entity } from './Entity';
import { Item } from './Item';
import { clamp } from './utils';

class Inventory {
    items: Item[];
    protected entity?: Entity;

    constructor(entity?: Entity){
        this.items = [];
        this.entity = entity;
    }

    link(entity?: Entity){
        this.entity = entity;

        this.items.forEach((item) => {
            item.link(entity);
        })
    }

    add(item: Item){
        if(this.entity)
            item.link(this.entity);

        this.items.push(item);
    }

    remove(item: Item){
        let i = this.items.indexOf(item);
        if(i != -1){
            this.items.splice(i, 1);
            item.entity = undefined;
        }
    }

    update(){
        this.items.forEach((item) => {
            item.update();  
        })

        this.items.forEach((item, i) => {
            if(item.beingRemoved)
                this.items.splice(i, 1);  
        })
    }
}

class Equipped extends Inventory {
    protected entity!: Entity;

    cooldown: {
        current: number,
        max: number
    }

    constructor(entity: Entity){
        super(entity);

        this.cooldown = {
            current: 0,
            max: 60
        }
    }

    update(){
        let { cooldown: cd } = this;

        this.cooldown.current = clamp(cd.current - 1, { min: 0, max: cd.max });

        this.items.forEach((item, i) => {
            if(item.beingRemoved)
                this.items.splice(i, 1);  
        })
    }

    add(...items: Item[]) {
        if(this.cooldown.current == 0){
            this.cooldown.current = this.cooldown.max;

            items.forEach((item) => {
                if(!this.entity.inventory?.items.includes(item)) return;
        
                if(this.entity.control){
                    let { control } = this.entity;
                    let added = true;
                    if(item.controlCost)
                        Object.entries(item.controlCost).forEach(([category, value]) => {
                            if(category in control){
                                if(value + control[category].current > control[category].max){
                                    added = false;
                                }
                            }
                            else {
                                added = false;
                            }
                        })
        
                    if(added){
                        Object.entries(item.controlCost).forEach(([category, value]) => {
                            control[category].current += value;
                        })
        
                        super.add(item);
                    }
                }
                else if(!item.controlCost){
                    super.add(item);
                }
            });
        }
    }

    remove(item: Item){
        if(this.entity.control){
            let { control } = this.entity;

            Object.entries(item.controlCost).forEach(([category, value]) => {
                control![category].current -= value;
            })
            
            super.remove(item);
        }
        else {
            super.remove(item);
        }
    }
}

export {
    Inventory,
    Equipped
}