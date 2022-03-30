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

    constructor(entity: Entity){
        this.entity = entity;

        this.settings = {};

        this.id = id();
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    use(data: AbilityInput){

    }

    update(){

    }
}

export {
    Ability
}