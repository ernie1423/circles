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
    name: I['name'];
}

class Item {

    /**
     * Наименование вида
     * * может помочь клиенту визуализировать отдельные предметы по-разному
     * * может помочь ИИ распознавать предметы легче
     */
    readonly name: string = 'item';

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
        usable: boolean
    }

    /**
     * Настройки предмета
     */
    settings: {
        
    }

    /**
     * Прочность предмета
     */
    durability: {
        current: number,
        max?: number
    }

    /**
     * Затрачиваемые очки контроля при экипировке предмета
     */
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
        this.state = {
            usable: true
        };
        this.beingRemoved = false;
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    /**
     * Получить копию этого предмета, но с лишь некоторыми данными и без методов
     */
    data(): ItemData<this> {
        return {
            id: this.id,
            charge: this.charge,
            state: this.state,
            settings: this.settings,
            durability: this.durability,
            name: this.name
        }
    }

    /**
     * Попробовать использовать предмет зависимо от состояния и прочего.
     * 
     * @param data Входные данные предмета
     */
    softUse(data: ItemInput): boolean {
        if(this.state.usable){
            this.use(data);

            return true;
        }
        else return false;
    }

    use(data: ItemInput){
        
    }

    /**
     * Попробовать убрать предмет из инвентаря и создать сущность, отражающую этот предмет.
     */
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

    /**
     * Привязать предмет к сущности
     */
    link(entity?: Entity){
        this.entity = entity;
    }

    /**
     * Вызывается после каждого обновления сущности
     */
    update(){

    }
}

export {
    Item,
    ItemData,
    ItemInput
}