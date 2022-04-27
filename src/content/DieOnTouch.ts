import { Ability } from '../Ability';
import { Entity } from '../Entity';

class DieOnTouch extends Ability {
    constructor(entity: Entity){
        super(entity);
    }

    update(){
        this.entity.layer.entities.forEach(entity => {
            if(this.entity.team.members.includes(entity)) return;

            if(entity.body && this.entity.body){
                if(this.entity.body?.intersects(entity.body)){
                    this.entity.beingRemoved = true;
                }
            }
        })
    }
}

export {
    DieOnTouch
}