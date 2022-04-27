import { Ability } from '../Ability';
import { Attribute } from '../Attribute';
import { Entity } from '../Entity';

class Spikes extends Ability {
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
        this.entity.layer.entities.forEach(entity => {
            if(!this.entity.team.members.includes(entity))
            if(entity.body && this.entity.body && entity.health){
                if(this.entity.body.intersects(entity.body)){
                    entity.health.current -= this.attributes.damage.value;
                }
            }
        })
    }
}

export {
    Spikes
}