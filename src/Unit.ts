import { Entity } from './Entity';
import { Inventory } from './Inventory';
import { Layer } from './Layer';

class Unit extends Entity {
    health: {
        current: number,
        max: number
    }
    
    charge: {
        current: number,
        max: number
    }

    inventory: Inventory;
    
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

        this.inventory = new Inventory(this);
    }
}

export {
    Unit
}