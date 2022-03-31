import { Ability } from './Ability';
import { Attribute } from './Attribute';
import { Controller } from './Controller';
import { Effect } from './Effect';
import { Item } from './Item';
import { Layer } from './Layer';
import { Vector, clamp, id } from './utils';

class Entity {

    /**
     * В каком слое находится
     * 
     * * используется в предметах / способностях
     */
    layer: Layer

    /**
     * Идентификатор сущности
     */
    id: string;

    /**
     * Координаты сущности
     */
    position: Vector;

    /**
     * Текущие и максимальные очки здоровья
     */
    health?: {
        current: number,
        max?: number
    }

    /**
     * Текущие и максимальные очки заряда
     */
    charge?: {
        current: number,
        max?: number
    }

    /**
     * Способности сущности
     */
    abilities: Ability[];

    /**
     * Инвентарь сущности
     */
    inventory?: Item[];

    /**
     * Эффекты, наложенные на сущность
     */
    effects: Effect[];

    /**
     * Набор атрибутов
     */
    attributes: {[key: string]: Attribute};

    /**
     * Стоит ли убирать сущность
     */
    beingRemoved: boolean;
    
    /**
     * Своего рода ИИ
     */
    controller?: Controller;

    /**
     * "Индикаторы" сущности
     */
    state: {

    }

    /**
     * 
     * @param x Координата сущности
     * @param y Координата сущности
     */
    constructor(x: number, y: number, layer: Layer){
        this.position = new Vector(x, y);

        this.abilities = [];
        this.attributes = {};
        this.effects = [];
        this.beingRemoved = false;

        if(!layer.newEntities.includes(this)){
            layer.newEntities.push(this);
        }

        this.layer = layer;

        this.id = id();
        this.state = {};
    }

    updateAbilities(){
        this.abilities.forEach((ability) => {
            ability.update();
        })
    }

    updateAttributes(){
        Object.values(this.attributes).forEach((attribute) => {
            attribute.reset();
        });
    }

    updateEffects(){
        this.effects.forEach(({ attributeChanges, healthChanges, chargeChanges, lifespan }, i) => {
            Object.entries(attributeChanges).forEach(([ name, toAdd ]) => {
                if(name in this.attributes)
                    this.attributes[name].value += toAdd;
            })

            if(this.health)
                this.health.current += healthChanges;

            if(this.charge)
                this.charge.current += chargeChanges;

            if(lifespan <= 0){
                this.effects.splice(i, 1);
            }
            else {
                this.effects[i].lifespan--;
            }
        })
    }

    updateItems(){
        if(this.inventory){
            this.inventory.forEach((item, i) => {
                item.update();
                if(item.beingRemoved){
                    this.inventory?.splice(i, 1);
                }
            })
        }
    }

    updateStats(){
        if(this.health?.max){
            this.health.current = clamp(this.health.current, { max: this.health.max });
        }

        if(this.charge?.max){
            this.charge.current = clamp(this.charge.current, { max: this.charge.max });
        }

        if(this.health)
            if(this.health.current <= 0){
                this.beingRemoved = true;
            }
    }

    updateController(){
        this.controller?.update();
    }

    interact(sender: Entity, data?: any){

    }
}

export {
    Entity
}