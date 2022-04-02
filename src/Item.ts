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

interface ItemData<I extends Item = Item> {
    id: string;
    charge?: {
        max: number,
        current: number
    }
    state: I['state'];
    settings: I['settings'];
    durability: I['durability'];
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

    controlCost: {
        [key: string]: number
    }

    constructor(entity?: Entity){
        this.entity = entity;

        this.settings = {};
        
        this.durability = {
            current: 5,
        }
        
        this.controlCost = {};

        this.id = id();
        this.state = {};
        this.beingRemoved = false;
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    data(): ItemData<this> {
        return {
            id: this.id,
            charge: this.charge,
            state: this.state,
            settings: this.settings,
            durability: this.durability
        }
    }

    use(data: ItemInput): any {
        
    }

    drop(): void
    drop(x: number, y: number, layer: Layer): void
    drop(x?: number, y?: number, layer?: Layer){
        if(this.entity){
            this.beingRemoved = true;

            let { position: pos } = this.entity;

            this.entity
                .layer.add(new DroppedItem(
                    (typeof x == 'number') ? x : pos.x,
                    (typeof y == 'number') ? y : pos.y,
                    (layer) ? layer : this.entity.layer,
                    this
                ));
            this.entity = undefined;
        }
        else if(typeof x == 'number' && typeof y == 'number' && layer){
            layer.add(new DroppedItem(
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
    Item,
    ItemData,
    ItemInput
}