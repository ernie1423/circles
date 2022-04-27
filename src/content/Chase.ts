import { Behavior } from "../Behavior";
import { BehaviorInterface } from "../BehaviorInterface";
import { Entity, EntityData } from "../Entity";
import { Vector } from "../utils";

class Chase<E extends Entity> extends Behavior<E> {
    range: number;

    constructor(behaviorInterface: BehaviorInterface<E>, range: number){
        super(behaviorInterface);

        this.range = range;
    }

    update(){
        let abilities = this.behaviorInterface.getAbilities();

        let sight: EntityData[] = abilities.find(ability => ability.name == 'vision')?.state.sight || [];

        let rawPosition = this.behaviorInterface.entityData().position;
        let position = new Vector(rawPosition.x, rawPosition.y);

        let closest: Vector | undefined;

        sight.forEach(entity => {
            let targetPosition = new Vector(
                entity.position.x,
                entity.position.y
            );
 
            if(targetPosition.distance(position) <= this.range){
                if(closest ? targetPosition.distance(position) < closest.distance(position) : true){
                    if(closest == undefined){
                        closest = new Vector(
                            targetPosition.x,
                            targetPosition.y
                        );
                    }
                    else {
                        closest.set(
                            targetPosition.x,
                            targetPosition.y
                        )
                    }
                }
            }
        })

        if(closest){
            let movementAbilityID = abilities.find(ability => ability.name == 'movement')?.id;

            if(movementAbilityID){
                this.behaviorInterface.useAbility(movementAbilityID, {
                    position: {
                        x: closest.x,
                        y: closest.y
                    }
                });
            }
        }
    }
}

export {
    Chase
}