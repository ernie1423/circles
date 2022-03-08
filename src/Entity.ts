import { Ability } from 'Ability';
import { Attribute } from 'Attribute';
import { Controller } from 'Controller';
import { Effect } from 'Effect';
import { Vector } from 'utils';

class Entity {
    position: Vector;

    abilities: Ability[];
    effects: Effect[];
    attributes: {[key: string]: Attribute};

    beingRemoved: boolean;
    
    controller?: Controller;

    constructor()
    constructor(vector: Vector)
    constructor(x: number, y: number)
    constructor(xOrVector?: number | Vector, y?: number){
        if(xOrVector instanceof Vector){
            this.position = xOrVector.clone();
        }
        else if(typeof xOrVector == 'number' && typeof y == 'number'){
            this.position = new Vector(xOrVector, y);
        }
        else {
            this.position = new Vector();
        }

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
            if(attribute.resetting)
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

        Object.values(this.attributes).forEach((attribute) => {
            attribute.clamp();
        });
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