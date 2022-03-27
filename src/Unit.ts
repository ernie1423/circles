import { Entity } from './Entity';

class Unit extends Entity {
    health: {
        current: number,
        max: null | number
    }
    
    charge: {
        current: number,
        max: null | number
    }
    
    constructor(x: number, y: number) {
        super(x, y);

        this.health = {
            current: 10,
            max: 10
        }

        this.charge = {
            current: 10,
            max: 10
        }
    }
}

export {
    Unit
}