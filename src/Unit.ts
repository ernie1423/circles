import { Entity } from './Entity';
import { Layer } from './Layer';

class Unit extends Entity {
    health: {
        current: number,
        max: null | number
    }
    
    charge: {
        current: number,
        max: null | number
    }
    
    constructor(x: number, y: number, layer: Layer) {
        super(x, y, layer);

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