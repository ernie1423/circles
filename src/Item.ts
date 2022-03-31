import { DroppedItem } from './DroppedItem';
import { Entity } from './Entity';
import { Layer } from './Layer';
import { id, Vector } from './utils';

interface ItemInput {
    /**
     * Местность
     */
    position?: Vector,

    /**
     * Идентификатор сущности
     */
    entity?: string,

    /**
     * Идентификатор способности
     */
    ability?: string,

    /**
     * Идентификатор эффекта
     */
    effect?: string
}

class Item {
    /**
     * Стоит ли убирать предмет
     */
    beingRemoved: boolean;

    /**
     * Идентификатор предмета
     */
    id: string;

    /**
     * Сущность, обладающая этим предметом
     */
    entity?: Entity;

    /**
     * Текущие и максимальные очки заряда
     */
    charge?: {
        max: number,
        current: number
    }

    /**
     * Состояние предмета
     */
    state: {

    }

    /**
     * Настройки предмета
     */
    settings: {
        
    }

    durability: {
        current: number,
        max?: number
    }

    constructor(entity?: Entity){
        this.entity = entity;

        this.settings = {};
        
        this.durability = {
            current: 5,
        }

        this.id = id();
        this.state = {};
        this.beingRemoved = false;
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    use(data: ItemInput){
        
    }

    drop(): void
    drop(x: number, y: number, layer: Layer): void
    drop(x?: number, y?: number, layer?: Layer){
        if(this.entity){
            this.beingRemoved = true;

            let { position: pos } = this.entity;

            this.entity
                .layer
                .newEntities.push(new DroppedItem(
                    (typeof x == 'number') ? x : pos.x,
                    (typeof y == 'number') ? y : pos.y,
                    (layer) ? layer : this.entity.layer,
                    this
                ));
            this.entity = undefined;
        }
        else if(typeof x == 'number' && typeof y == 'number' && layer){
            layer.newEntities.push(new DroppedItem(
                x,
                y,
                layer,
                this
            ));
        }
    }

    link(entity?: Entity){
        this.entity = entity;
    }

    update(){

    }
}

export {
    Item
}