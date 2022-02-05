import { Entity } from 'Entity';
import { clamp } from 'utils';

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
    
    constructor(x: number, y: number) {
        super(x, y);

        this.health = {
            max: 10,
            current: 10,
            recovery: 0
        }
    }
    
    update(){
        super.update();
        let { health, charge } = this;

        health.current = clamp(health.current + health.recovery, health.max, 0);
        
        if(charge)
            charge.current = clamp(charge.current + charge.recovery, charge.max, 0);
        
    }
}

export {
    Unit
}