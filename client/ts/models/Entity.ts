import { Vector } from '../utils';
import { Ability, AbilityData } from './Ability';

enum EntityBodyType {
    Other = 0,
    Circle = 1
}

interface EntityBodyData {
    name: EntityBodyType
    position: {
        x: number,
        y: number
    }
}

interface CircleData extends EntityBodyData {
    name: EntityBodyType.Circle,
    radius: number
}

class CircleBody implements CircleData {
    name: EntityBodyType.Circle;
    position: Vector;
    radius: number;

    constructor({name, position, radius}: CircleData){
        this.name = name;
        this.position = new Vector(
            position.x,
            position.y
        );
        this.radius = radius;
    }
}

type EntityBodies = CircleBody;
type EntityBodiesData = CircleData;

enum EntityType {
    Other = 0,
    Unit = 1,
    Item = 2,
    Projectile = 3
}

interface EntityData {
    id: string;
    name: string;
    position: {
        x: number;
        y: number;
    }
    abilities?: AbilityData[]
    body?: EntityBodiesData,
    type: EntityType
}

class Entity {
    id: string;
    name: string;
    position: Vector;
    abilities?: Ability[];
    body?: EntityBodies;
    type: EntityType

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

        if(entityData.body){
            switch(entityData.body.name){
                case EntityBodyType.Circle:
                    this.body = new CircleBody(entityData.body);
            }
        }

        this.type = entityData.type;
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