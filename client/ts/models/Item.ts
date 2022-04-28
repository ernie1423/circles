import { Socket } from '../Socket';
import { Input, InputData } from './Ability';
import { Entity } from './Entity';

interface ItemData {
    id: string,
    name: string,
    charge?: {
        max: number,
        current: number
    }
}

class Item {
    id: string;
    name: string;
    charge?: {
        max: number,
        current: number
    }
    entity: Entity;

    constructor(itemData: ItemData, entity: Entity){
        this.id = itemData.id;
        this.name = itemData.name;
        this.charge = itemData.charge;

        this.entity = entity;
    }

    use({ position }: Input, socket: Socket){
        let newData: Partial<InputData> = {};

        let { position: EPosition } = this.entity;

        newData.position = position ? 
            position.relative ? 
                EPosition.summary(position.vector).toJSONable()
                : position.vector.toJSONable()
        : undefined
    
        socket.useItems([this.id, newData]);
    }

    equip(socket: Socket){
        socket.equipItems(this.id);
    }

    update(newData: ItemData){
        this.name = newData.name;
        this.charge = newData.charge;
    }
}

export {
    ItemData,
    Item
}