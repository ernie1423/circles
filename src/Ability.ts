import { Entity } from 'Entity';
import { clamp } from 'utils';

class Ability {
    entity: Entity;

    cooldown: {
        max: number,
        current: number,
        recovery: number
    }

    constructor(entity: Entity){
        this.entity = entity;

        this.cooldown = {
            max: 1,
            current: 1,
            recovery: 1
        }
    }

    resetCooldown(){
        this.cooldown.current = 0;
    }

    recoverCooldown(){
        let { cooldown } = this;
        let { recovery, current, max } = cooldown;
        
        cooldown.current = clamp(current + recovery, 0, max);
    }

    use(data?: any){

    }

    update(){

    }
}

export {
    Ability
}