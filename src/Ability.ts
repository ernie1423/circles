import { Attribute, AttributeData } from './Attribute';
import { Entity, EntityData } from './Entity';
import { id, Vector } from './utils';

/**
 * Входные данные способности
 */
interface AbilityInput {
    /**
     * Местность
     */
    position?: {
        x: number,
        y: number
    },

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
    name: A['name'],
    charge: A['charge'],
    settings: A['settings'],
    state: A['state'],
    attributes: {
        [key in keyof A['attributes']]: AttributeData
    }
}

/**
 * Отдельная функциональная черта сущности
 */
class Ability {

    /**
     * Наименование вида
     * * может помочь клиенту визуализировать отдельные способности по-разному
     * * может помочь ИИ распознавать способности легче
     */
    readonly name: string = 'ability';
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
    state: { [key: string]: any } & {
        usable: boolean,
        sight?: EntityData<Entity>[]
    }

    attributes: {
        [name: string]: Attribute;
    }

    constructor(entity: Entity){
        this.entity = entity;

        this.settings = {};
        this.state = {
            usable: true
        };

        this.attributes = {};

        this.id = id();
    }

    updateSettings(data: typeof this['settings']){
        this.settings = data;
    }

    data(): AbilityData<this> {

        let atrDatas: AbilityData<this>['attributes'] = (() => {
            let x: { [key in keyof this['attributes']]?: AttributeData } = {};
            
            Object.entries(this.attributes).forEach(([name, attribute]) => {
                x[name as keyof this['attributes']] = attribute.data();
            })

            return x as AbilityData<this>['attributes'];
        })();

        return {
            state: this.state,
            settings: this.settings,
            charge: this.charge,
            id: this.id,
            name: this.name,
            attributes: atrDatas
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