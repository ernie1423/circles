import { Entity } from './Entity';
import { clamp, id } from './utils';

class Ability {
    /**
     * Идентификатор способности
     */
    id: string;

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

        this.id = id();
    }

    resetCooldown(){
        this.cooldown.current = 0;
    }

    recoverCooldown(){
        let { cooldown } = this;
        let { recovery, current, max } = cooldown;
        
        cooldown.current = clamp(
            current + recovery,
            {
                min: 0,
                max: max
            }
        );
    }

    use(data?: any){

    }

    update(){

    }
}

export {
    Ability
}