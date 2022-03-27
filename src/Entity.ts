import { Ability } from './Ability';
import { Attribute } from './Attribute';
import { Controller } from './Controller';
import { Effect } from './Effect';
import { Vector, clamp } from './utils';

class Entity {
    /**
     * Координаты сущности
     */
    position: Vector;

    /**
     * Текущие и максимальные очки здоровья
     */
    health?: {
        current: number,
        max: null | number
    }

    /**
     * Текущие и максимальные очки заряда
     */
    charge?: {
        current: number,
        max: null | number
    }

    /**
     * Способности сущности
     */
    abilities: Ability[];

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
     * 
     * @param x Координата сущности
     * @param y Координата сущности
     */
    constructor(x: number, y: number){
        this.position = new Vector(x, y);

        this.abilities = [];
        this.attributes = {};
        this.effects = [];
        this.beingRemoved = false;
    }

    updateAbilities(){
        this.abilities.forEach((ability) => {
            ability.update();
            ability.recoverCooldown();
        })
    }

    updateAttributes(){
        Object.values(this.attributes).forEach((attribute) => {
            attribute.reset();
        });
    }

    updateEffects(){
        this.effects.forEach(({ attributeChanges, lifespan }, i) => {
            Object.entries(attributeChanges).forEach(([ name, toAdd ]) => {
                if(name in this.attributes)
                    this.attributes[name].value += toAdd;
            })

            if(lifespan <= 0){
                this.effects.splice(i, 1);
            }
            else {
                this.effects[i].lifespan--;
            }
        })
    }

    updateStats(){
        if(this.health?.max){
            this.health.current = clamp(this.health.current, { max: this.health.max });
        }

        if(this.charge?.max){
            this.charge.current = clamp(this.charge.current, { max: this.charge.max });
        }
    }

    updateController(){
        this.controller?.update();
    }

    interact(){

    }
}

export {
    Entity
}