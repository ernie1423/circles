/**
 * Represents a number, where changes can be affected.
 */
class Numerical<dataType> {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    /**
     * Tries to apply a change.
     */
    apply(data: dataType, value: number): void {
        // you can add conditions of applying by using super.apply and etc.
        this.value = value;
    }
}

/**
 * Represents a Numerical that can be 0, `max`, or anything between 0 and `max`. `max` must be higher than 0.
 */
class Bar<dataType> extends Numerical<dataType> {
    /**
     * Sets a maximum to `value`.
     */
    set max(value: number){
        if(value <= 0){
            throw new Error('"max" cannot be equal or less than 0.');
        }
        else 
            this._max = value;
    }
    get max(){
        return this._max;
    }

    private _max: number;

    constructor(max: number, value?: number) {
        let initialValue = max;
        if(typeof value == 'number'){
            initialValue = value;
            if(value < 0)
                initialValue = 0;
            if(value > max)
                initialValue = max;
        }

        super(initialValue);

        this._max = 1;
        this.max = max;
    }

    /**
     * Tries to apply a change.
     */
    apply(data: dataType, value: number): void {
        this.value = value;
        if(value > this.max){
            this.value = this.max;
        }
        if(value < 0){
            this.value = 0;
        }
    }
}