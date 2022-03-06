import { Attribute } from 'Attribute';
import { Entity } from 'Entity';
import { clamp } from 'utils';

class Unit extends Entity {
    attributes: {
        healthLimit: Attribute,
        healthRecovery: Attribute,
        health: Attribute,

        chargeLimit: Attribute,
        chargeRecovery: Attribute,
        charge: Attribute,
    }
    
    constructor(x: number, y: number) {
        super(x, y);

        this.attributes = {
            healthLimit: new Attribute(10),
            healthRecovery: new Attribute(0, true),
            health: new Attribute(10),

            chargeLimit: new Attribute(10),
            chargeRecovery: new Attribute(1, true),
            charge: new Attribute(10)
        }

        const { attributes: atrs } = this;
        atrs.health.max = atrs.healthLimit.value;
        atrs.charge.max = atrs.chargeLimit.value;
    }
}

export {
    Unit
}