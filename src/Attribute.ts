import { Entity } from 'Entity';

class Attribute {
    initialValue: number;
    value: number;
    
    constructor(initialValue: number){
        this.initialValue = initialValue;
        this.value = initialValue;
    }

    reset(){
        this.value = this.initialValue;
    }

    update(entity: Entity){
        
    }
}

export {
    Attribute
}