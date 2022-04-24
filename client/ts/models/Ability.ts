import { Socket } from '../Socket';
import { Vector } from '../utils';
import { Entity, EntityData } from './Entity';

interface AbilityInputData {
    position?: {
        x: number,
        y: number
    }
}

interface AbilityInput {
    position?: {
        relative: boolean;
        vector: Vector;
    }
}

interface AbilityData {
    id: string;
    name: string;
    charge: {
        max: number;
        current: number;
    },
    state: {
        sight?: EntityData[]
    },
    attributes: {
        [name: string]: {
            initialValue: number,
            value: number
        }
    }
}

class Ability {
    id: string;
    name: string;
    charge: {
        max: number;
        current: number;
    }
    state: {
        sight?: Entity[]
    }
    attributes: {
        [name: string]: {
            initialValue: number,
            value: number
        }
    }

    entity: Entity

    constructor({ id, name, charge, attributes, state }: AbilityData, entity: Entity){
        this.id = id;
        this.name = name;
        this.charge = charge;
        this.attributes = attributes;

        this.state = {};
        this.state.sight = state?.sight?.map(entityData => new Entity(entityData));
        
        this.entity = entity;
    }

    use({ position }: AbilityInput, socket: Socket){
        let newData: Partial<AbilityInputData> = {};

        let { position: EPosition } = this.entity

        newData.position = position ? 
            position.relative ? 
                EPosition.summary(position.vector).toJSONable()
                : position.vector.toJSONable()
        : undefined

        socket.useAbility(this.id, newData as AbilityInputData);
    }

    update({ id, name, charge, state }: AbilityData){
        this.id = id;
        this.name = name;
        this.charge = charge;

        if(this.state.sight){
            if(state.sight === undefined){
                this.state.sight = [];
            }
            else {
                let newIDs = state.sight.map(entityData => entityData.id);

                this.state.sight.forEach((entity, i) => {
                    if(!newIDs.includes(entity.id)){
                        entity.beingRemoved = true;
                        this.state.sight!.splice(i, 1);
                    }
                })

                let pastIDs = this.state.sight.map(entity => entity.id);

                state.sight.forEach(entityData => {
                    if(pastIDs.includes(entityData.id)){
                        this.state.sight!.find(entity => entity.id == entityData.id)?.update(entityData);
                    }
                    else {
                        this.state.sight!.push(new Entity(entityData));
                    }
                })
            }
        }
    }
}

export {
    AbilityData,
    Ability,
    AbilityInputData,
    AbilityInput
}