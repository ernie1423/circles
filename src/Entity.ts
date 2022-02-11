import { Ability } from 'Ability';
import { Vector } from 'utils';

class Entity {
    position: Vector;
    abilities: Ability[];

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
    }

    update(): void {
        for(let ability of this.abilities){
            ability.update();
        }
    }
}

export {
    Entity
}