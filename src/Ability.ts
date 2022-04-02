import { Entity } from './Entity';
import { id, Vector } from './utils';

interface AbilityInput {
    /**
     * Местность
     */
    position?: Vector,

    /**
     * Идентификатор сущности
     */
    entity?: string,

    /**
     * Идентификатор способности
     */
    ability?: string,

    /**
     * Идентификатор эффекта
     */
    effect?: string
}

class Ability {
    /**
     * Идентификатор способности
     */
    id: string;

    /**
     * Сущность, обладающая этой способностью
     */
    entity: Entity;

    /**
     * Текущие и максимальные очки заряда
     */
    charge?: {
        max: number,
        current: number
    }

    /**
     * Настройки способности
     */
    settings: {
        
    }

    /**
     * "Индикаторы" способности
     */
    state: {
        usable: boolean
    }

    constructor(entity: Entity){
        this.entity = entity;

        this.settings = {};
        this.state = {
            usable: true
        };

        this.id = id();
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    softUse(data: AbilityInput): boolean {
        if(this.state.usable){
            this.use(data);
            
            return true;
        }
        else return false;
    }

    use(data: AbilityInput){

    }

    update(){

    }
}

export {
    Ability
}