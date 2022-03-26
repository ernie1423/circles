import { Attribute } from 'Attribute';
import { Entity } from 'Entity';
import { clamp } from 'utils';

class Unit extends Entity {
   health: {
       current: number,
       max: null | number
   }
   
   charge: {
       current: number,
       max: null | number
   }

    attributes: {
        healthRecovery: Attribute,
        chargeRecovery: Attribute,
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

        this.attributes = {
            healthRecovery: new Attribute(0),
            chargeRecovery: new Attribute(0.1)
        }
    }
}

export {
    Unit
}