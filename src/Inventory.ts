import { Entity } from './Entity';
import { Item } from './Item';

class Inventory {
    items: Item[];
    private entity?: Entity;

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

    update(){
        this.items.forEach((item) => {
            item.update();  
        })

        this.items.forEach((item, i) => {
            this.items.splice(i, 1);  
        })
    }
}

export {
    Inventory
}