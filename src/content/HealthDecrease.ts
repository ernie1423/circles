import { Ability } from "../Ability";
import { Attribute } from "../Attribute";
import { Entity } from "../Entity";

class HealthDecrease extends Ability {
    attributes: {
        damage: Attribute
    }

    constructor(entity: Entity, damage: number){
        super(entity);

        this.attributes = {
            damage: new Attribute(damage)
        }
    }

    update(){
        if(this.entity.health)
            this.entity.health.current -= this.attributes.damage.value;
    }
}

export {
    HealthDecrease
}