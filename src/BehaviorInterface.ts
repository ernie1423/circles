import { AbilityData, AbilityInput } from './Ability';
import { Behavior } from './Behavior';
import { Entity } from './Entity';
import { Item, ItemData } from './Item';

class BehaviorInterface<E extends Entity> {
    entity: E;
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

    /**
     * Пробует использовать предмет по его идентификатору. Возвращает true, если предмет удалось использовать, в ином случае false
     * 
     * @param id Идентификатор используемого предмета
     * @param data Входные данные для предмета
     */
    useItem<I extends Item = Item>(id: string, data: Parameters<I['use']>[0]): boolean {
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
    getAbilites(): AbilityData[] {
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
    useAbility(id: string, data: AbilityInput): boolean {
        let ability = this.entity.abilities.find(ability => ability.id == id);

        if(ability)
            return ability.softUse(data);

        else return false;
    }
}

export {
    BehaviorInterface
}