import { AbilityData, Input } from './Ability';
import { Behavior } from './Behavior';
import { EffectData } from './Effect';
import { Entity, EntityData } from './Entity';
import { Item, ItemData } from './Item';

class BehaviorInterface<E extends Entity> {
    protected entity: E;
    behavior?: Behavior<E>;

    constructor(entity: E, behavior?: Behavior<E>){
        this.entity = entity;
        
        this.setBehavior(behavior);
    }

    /**
     * Устанавливает новое поведение сущности.
     * 
     * @param behavior Поведение, которое надо установить
     */
    setBehavior(behavior?: Behavior<E>){
        this.behavior = behavior;
        if(behavior)
            behavior.behaviorInterface = this;
    }

    /**
     * Вызывается после каждого обновления сущности
     */
    update(){
        this.behavior?.update();
    }

    getEquipped(): ItemData[] | null {
        if(this.entity.equipped !== undefined){
            return this.entity.equipped.items.map(item => item.data()) 
        }
        else return null;
    }

    /**
     * Получить данные предметов в инвентаре.
     */
    getItems(): ItemData[] | null {
        if(this.entity.inventory !== undefined)
            return this.entity.inventory.items.map(item => item.data());

        else return null;
    }

    /**
     * Получить данные от одного предмета по его идентификатору.
     * 
     * @param id Идентификатор предмета, от которого надо получить данные
     */
    getItem(id: string): ItemData | null {
        if(this.entity.inventory !== undefined){
            let item = this.entity.inventory.items.find(item => item.id == id);

            if(item)
                return item.data();
            
            else return null;
        }
        else return null;
    }

    equipItems(ids: string[]){
        if(this.entity.equipped !== undefined && this.entity.inventory !== undefined){
            let items = this.entity.inventory.items.filter(item => ids.includes(item.id));

            this.entity.equipped.add(...items);
        }
    }

    /**
     * Пробует использовать предмет по его идентификатору. Возвращает true, если предмет удалось использовать, в ином случае false
     * 
     * @param id Идентификатор используемого предмета
     * @param data Входные данные для предмета
     */
    useItem(id: string, data: Input): boolean {
        if(this.entity.equipped !== undefined){
            let item = this.entity.equipped.items.find(item => item.id == id);

            if(item)
                return item.softUse(data);
                
            else return false;
        }
        else return false;
    }

    /**
     * Получить данные способностей, имеющихся у сущности.
     */
    getAbilities(): AbilityData[] {
        return this.entity.abilities.map(ability => ability.data());
    }

    /**
     * Получить данные одной способности с указанным идентификатором.
     * 
     * @param id Идентификатор способности
     */
    getAbility(id: string): AbilityData | null {
        let ability = this.entity.abilities.find(ability => ability.id == id);

        if(ability)
            return ability.data();

        else return null;
    }

    /**
     * Попробовать использовать способность по его идентификатору. Возвращает `true`, если способность удалось использовать, в противном случае `false`.
     * 
     * @param id Идентификатор способности
     * @param data Входные данные для способности
     */
    useAbility(id: string, data: Input): boolean {
        let ability = this.entity.abilities.find(ability => ability.id == id);

        if(ability)
            return ability.softUse(data);

        else return false;
    }

    entityData(): EntityData<E> {
        return this.entity.data();
    }

    getEffects(): EffectData[] {
        return this.entity.effects.map(eff => eff.data());
    }
}

export {
    BehaviorInterface
}