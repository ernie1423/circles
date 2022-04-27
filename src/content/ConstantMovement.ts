import { Ability } from '../Ability';
import { Attribute } from '../Attribute';
import { Entity } from '../Entity';
import { Vector } from '../utils';

const { cos, sin } = Math;

class ConstantMovement extends Ability {
    attributes: {
        speed: Attribute;
    }

    state: Ability["state"] & {
        angle: number
    }

    constructor(entity: Entity, speed: number, angle: number){
        super(entity);

        this.attributes = {
            speed: new Attribute(speed),
        }

        this.state = {
            usable: true,
            angle: angle
        }
    }

    update(){
        super.update();

        this.entity.position.add(
            new Vector(
                this.attributes.speed.value * cos(this.state.angle),
                this.attributes.speed.value * sin(this.state.angle)
            )
        )
    }
}

export {
    ConstantMovement
}