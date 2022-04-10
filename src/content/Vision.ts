import { Ability } from '../Ability';
import { Attribute } from '../Attribute';
import { Entity } from '../Entity';

interface PartialEntityData {
    id: string;
    name: string;
    position: {
        x: number,
        y: number
    }
}

class Vision extends Ability {
    name: string = 'vision'

    state: Ability['state'] & {
        sight: PartialEntityData[]
    }

    attributes: {
        range: Attribute
    }

    constructor(entity: Entity, range: number){
        super(entity);

        this.state = {
            usable: true,
            sight: []
        }

        this.attributes = {
            range: new Attribute(range)
        }
    }

    protected toPartialEntityData(entity: Entity): PartialEntityData {
        let { position: pos } = entity;

        return {
            id: entity.id,
            name: entity.name,
            position: {
                x: pos.x,
                y: pos.y
            }
        }
    }

    update(){
        this.state.sight = [];

        let { position: pos1 } = this.entity;
        let { entities } = this.entity.layer;

        let { value: range } = this.attributes.range;

        for(let entity of entities){
            let { position: pos2 } = entity;

            if(pos1.distance(pos2) <= range && entity.id != this.entity.id){
                this.state.sight.push(
                    this.toPartialEntityData(entity)
                )
            }
            
        }
    }
}

export {
    Vision
}