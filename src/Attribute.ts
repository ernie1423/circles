import { Entity } from './Entity';

interface AttributeData {
    initialValue: number,
    value: number
}

/**
 * Статистическая характеристика сущности, которая сбрасывается каждое обновление и вновь изменяется эффектами.
 */
class Attribute {
    /**
     * Значение, которое будет устанавливаться по умолчанию
     */
    initialValue: number;

    /**
     * Изменяемое значение
     */
    value: number;
    
    constructor(initialValue: number){
        this.initialValue = initialValue;
        this.value = initialValue;
    }

    /**
     * Сбросить изменённое значение.
     */
    reset(){
        this.value = this.initialValue;
    }

    update(entity: Entity){
        
    }

    data(): AttributeData {
        return {
            initialValue: this.initialValue,
            value: this.value
        }
    }
}

export {
    Attribute,
    AttributeData
}