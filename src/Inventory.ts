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

    /**
     * Привязать инвентарь и предметы в нём к сущности.
     */
    link(entity?: Entity){
        this.entity = entity;

        this.items.forEach((item) => {
            item.link(entity);
        })
    }

    /**
     * Добавить и привязать предмет.
     */
    add(item: Item){
        if(this.entity)
            item.link(this.entity);

        this.items.push(item);
    }

    /**
     * Убирает и отвязывает предмет, если он присутствует в инвентаре
     * 
     * @param item Предмет, который надо убрать и отвязать
     */
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

export {
    Inventory
}