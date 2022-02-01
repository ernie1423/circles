import { Ability } from 'Ability';
import { Entity } from 'Entity';

class Unit extends Entity {
    health: {
        max: number,
        current: number,
        recovery: number
    }
    
    charge?: {
        max: number,
        current: number,
        recovery: number
    }

    abilities: Ability[]
    
    constructor(x: number, y: number) {
        super(x, y);

        this.health = {
            max: 10,
            current: 10,
            recovery: 0
        }

        this.abilities = [];
    }
    
    update(){
        for(let ability of this.abilities){
            ability.update();
        }

        this.health.current += this.health.recovery;

        if(this.health.current > this.health.max)
            this.health.current = this.health.max;
        
        if(this.charge){
            this.charge.current += this.charge.recovery;
            
            if(this.charge.current > this.charge.max)
                this.charge.current = this.charge.max;
        }
    }
}

export {
    Unit
}