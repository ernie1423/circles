import { Vector } from '../utils';
import { Ability, AbilityData } from './Ability';

interface EntityData {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    }
    abilities?: AbilityData[]
}

class Entity {
    id: string;
    name: string;
    position: Vector;
    abilities?: Ability[];

    beingRemoved: boolean;

    constructor(entityData: EntityData){
        this.id = entityData.id;
        this.name = entityData.name;

        this.position = new Vector(
            entityData.position.x,
            entityData.position.y
        );

        this.beingRemoved = false;

        this.abilities = entityData.abilities?.map(rawAbility => new Ability(rawAbility, this));
    }

    update(newEntityData: EntityData){
        const { position: pos } = newEntityData;

        this.position.set(pos.x, pos.y);

        this.abilities?.forEach((ability, index) => {
            let newAbility = newEntityData.abilities?.find(newAbility => newAbility.id == ability.id);
            if(newAbility){
                ability.update(newAbility);
            }
            else {
                this.abilities?.splice(index, 1);
            }
        });

        newEntityData.abilities?.forEach(newAbility => {
            if(!this.abilities?.find(ability => ability.id == newAbility.id)){
                this.abilities?.push(new Ability(newAbility, this));
            }
        })
    }
}

export {
    Entity,
    EntityData
}