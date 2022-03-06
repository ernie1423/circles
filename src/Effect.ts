class Effect {
    attributeChanges: {[key: string]: number};
    lifespan: number;

    /**
     * 
     * @param lifespan Сколько обновлений ещё продержится. 0 или менее для разового изменения характеристик.
     */
    constructor(lifespan: number = 0){
        this.lifespan = lifespan;
        this.attributeChanges = {};
    }
}

export { Effect }