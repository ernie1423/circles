import { Entity } from './Entity';
import { id, Vector } from './utils';

/**
 * Входные данные способности
 */
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

interface AbilityData<A extends Ability = Ability> {
    id: string,
    charge: A['charge'],
    settings: A['settings'],
    state: A['state']
}

/**
 * Отдельная функциональная черта сущности
 */
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
     * Состояние способности
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

    data(): AbilityData<this> {
        return {
            state: this.state,
            settings: this.settings,
            charge: this.charge,
            id: this.id
        }
    }

    /**
     * Пробует использовать способность с учётом её состояния. Возвращает `false`, если способность не удалось использовать, в ином случае `true`.
     * 
     * @param data Входные параметры способности
     */
    softUse(data: AbilityInput): boolean {
        if(this.state.usable){
            this.use(data);
            
            return true;
        }
        else return false;
    }

    use(data: AbilityInput){

    }

    /**
     * Вызывается с каждым обновлением `Entity`.
     */
    update(){

    }
}

export {
    Ability,
    AbilityData,
    AbilityInput
}