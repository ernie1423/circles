class Effect {

    /**
     * Какое число будет прибавлено к значению атрибута, пока эффект не пропадёт
     */
    attributeChanges: {[key: string]: number};

    /**
     * Какое число будет прибавляться каждое обновление к текущим очкам здоровья
     */
    healthChanges?: number;

    /**
     * Какое число будет прибавляться каждое обновление к текущим очкам заряда
     */
    chargeChanges?: number;

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
    }
}

export { Effect }