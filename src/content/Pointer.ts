import { Ability, AbilityInput } from '../Ability';
import { Entity } from '../Entity';
import { Vector } from '../utils';

class Pointer extends Ability {
    controlled: Entity;

    name: string;

    constructor(entity: Entity){
        super(entity);

        this.controlled = new Entity(entity.position.x, entity.position.y, entity.layer);

        this.name = 'pointer';
    }

    use(data: AbilityInput){
        if(data.position){
            this.controlled.position = new Vector(data.position.x, data.position.y);
        }
    }

    update(){
        if(this.entity.beingRemoved){
            this.controlled.beingRemoved = true;
        }
    }
}

export { Pointer };