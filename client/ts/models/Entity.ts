import { Vector } from '../utils';
import { Ability, AbilityData } from './Ability';
import { Item, ItemData } from './Item';

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
    type: EntityType,
    equipped: ItemData[],
    inventory: ItemData[],
    health?: {
        max?: number,
        current: number
    }
}

class Entity {
    id: string;
    name: string;
    position: Vector;
    previousPosition: Vector;
    abilities?: Ability[];
    inventory?: Item[];
    equipped?: Item[];
    body?: EntityBodies;
    type: EntityType;
    health?: {
        max?: number,
        current: number
    }

    beingRemoved: boolean;

    constructor(entityData: EntityData){
        this.id = entityData.id;
        this.name = entityData.name;

        this.position = new Vector(
            entityData.position.x,
            entityData.position.y
        );
        this.previousPosition = new Vector(
            entityData.position.x,
            entityData.position.y
        )

        this.beingRemoved = false;

        this.abilities = entityData.abilities?.map(rawAbility => new Ability(rawAbility, this));

        this.inventory = entityData.inventory?.map(data => new Item(data, this));

        this.equipped = entityData.equipped?.map(data => new Item(data, this));

        if(entityData.body){
            switch(entityData.body.name){
                case EntityBodyType.Circle:
                    this.body = new CircleBody(entityData.body);
            }
        }

        this.type = entityData.type;

        this.health = entityData.health;
    }

    update(newEntityData: EntityData){
        const { position: pos } = newEntityData;

        this.previousPosition.set(
            this.position.x,
            this.position.y
        );

        this.position.set(pos.x, pos.y);

        this.health = newEntityData.health;

        this.abilities?.forEach((ability, index) => {
            let newAbility = newEntityData.abilities?.find(newAbility => newAbility.id == ability.id);

            if(newAbility)
                ability.update(newAbility);
            else 
                this.abilities?.splice(index, 1);
        });

        newEntityData.abilities?.forEach(newAbility => {
            if(!this.abilities?.find(ability => ability.id == newAbility.id))
                this.abilities?.push(new Ability(newAbility, this));
        });

        this.inventory?.forEach((item, index) => {
            let newItem = newEntityData.abilities?.find(newItem => newItem.id == item.id);

            if(newItem)
                item.update(newItem);
            else 
                this.inventory?.splice(index, 1);
        });

        newEntityData.equipped?.forEach(newItem => {
            if(!this.equipped?.find(item => item.id == newItem.id))
                this.equipped?.push(new Item(newItem, this));
        });
    }
}

export {
    Entity,
    EntityData,
    EntityType
}