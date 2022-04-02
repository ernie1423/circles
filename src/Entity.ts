import { Ability } from './Ability';
import { Attribute } from './Attribute';
import { Behavior } from './Behavior';
import { BehaviorInterface } from './BehaviorInterface';
import { Effect } from './Effect';
import { Equipped, Inventory } from './Inventory';
import { Layer } from './Layer';
import { Vector, clamp, id } from './utils';

/**
 * Обладает позицией и может взаимодействовать с другими сущностями.
 */
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
    inventory?: Inventory;

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
     * Интерфейс поведения сущности
     */
    behaviorInterface: BehaviorInterface<this>;

    /**
     * "Индикаторы" сущности
     */
    state: {

    }

    /**
     * Очки контроля
     * 
     * * используются для экипировки предметов
     */
    control?: {[key: string]: {current: number, max: number}};

    /**
     * Инвентарь для экипированных предметов
     */
    equipped?: Equipped;

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

        this.behaviorInterface = new BehaviorInterface(this);
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

    updateInventory(){
        if(this.inventory)
            this.inventory.update();
        if(this.equipped){
            this.equipped.update();
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

    updateBehavior(){
        this.behaviorInterface?.update();
    }

    /**
     * Устанавливает поведение сущности.
     *  
     * @param behavior Устанавливаемое поведение
     */
    setBehavior(behavior: Behavior<this>){
        this.behaviorInterface.setBehavior(behavior);
    }

    /**
     * Произвести взаимодействие с сущностью.
     */
    interact(sender: Entity, data?: any){

    }
}

export {
    Entity
}