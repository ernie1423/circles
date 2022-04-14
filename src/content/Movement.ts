import { Ability, AbilityInput } from '../Ability';
import { Attribute } from '../Attribute';
import { Entity } from '../Entity';
import { Vector } from '../utils';

const { cos, sin } = Math;

class Movement extends Ability {
    attributes: {
        speed: Attribute
    }

    constructor(entity: Entity, speed: number){
        super(entity);

        this.attributes = {
            speed: new Attribute(speed)
        }
    }

    use(data: AbilityInput){
        if(data.position){
            let from = this.entity.position.clone();
            let to = new Vector(data.position.x, data.position.y);

            let speed = this.attributes.speed.value;

            if(from.distance(to) < speed){
                this.entity.position.set(
                    to.x,
                    to.y
                )
            }
            else {
                let angle = from.angleTo(to);
                let added = new Vector(
                    speed * cos(angle),
                    speed * sin(angle)
                );
                this.entity.position.add(added);
            }

            this.state.usable = false;
        }
    }

    update(){
        this.state.usable = true;
    }
}

export {
    Movement
}