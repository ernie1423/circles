import { id } from "./utils";

interface EffectData<E extends Effect = Effect> {
    id: string,
    attributeChanges: E['attributeChanges'];
    healthChanges: number,
    chargeChanges: number,
    lifespan: number
}

/**
 * Длительное воздействие на атрибуты и показатели здоровья / заряда.
 */
class Effect {

    /**
     * Наименование вида
     * * может помочь клиенту визуализировать отдельные эффекты по-разному
     * * может помочь ИИ распознавать эффекты легче
     */
    readonly name: string = 'effect';

    /**
     * Идентификатор эффекта
     */
    id: string;

    /**
     * Какое число будет прибавлено к значению атрибута, пока эффект не пропадёт
     */
    attributeChanges: {[key: string]: number};

    /**
     * Какое число будет прибавляться каждое обновление к текущим очкам здоровья
     */
    healthChanges: number;

    /**
     * Какое число будет прибавляться каждое обновление к текущим очкам заряда
     */
    chargeChanges: number;

    /**
     * Сколько обновлений ещё продержится, 0 или менее для разового изменения характеристик
     */
    lifespan: number;

    /**
     * 
     * @param lifespan Сколько обновлений ещё продержится, 0 или менее для разового изменения характеристик
     */
    constructor(lifespan: number = 0){
        this.lifespan = lifespan;
        this.attributeChanges = {};
        this.healthChanges = 0;
        this.chargeChanges = 0;

        this.id = id();
    }

    data(): EffectData<this> {
        return { 
            id: this.id,
            attributeChanges: this.attributeChanges,
            healthChanges: this.healthChanges,
            chargeChanges: this.chargeChanges,
            lifespan: this.lifespan
        }
    }
}

export {
    Effect,
    EffectData
}