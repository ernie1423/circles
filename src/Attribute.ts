import { clamp } from 'utils';

interface ConstructorOptions {
    resetting?: boolean,
    max?: number,
    min?: number
}

class Attribute {
    initialValue: number;

    value: number;

    min?: number;
    max?: number;

    resetting: boolean;

    constructor(initialValue: number, options?: ConstructorOptions)
    constructor(initialValue: number, resetting?: boolean)
    constructor(initialValue: number, optionsOrResetting: ConstructorOptions | boolean = {}){
        this.initialValue = initialValue;
        this.value = initialValue;
        
        if(typeof optionsOrResetting == 'boolean'){
            this.resetting = optionsOrResetting;
        }
        else {
            const { resetting = false, min, max } = optionsOrResetting;

            if(min)
                this.min = min;

            if(max)
                this.max = max;

            this.resetting = resetting;
        }
    }

    reset(){
        this.value = this.initialValue;
    }

    clamp(){
        const {min, max} = this;

        this.value = clamp(this.value, {
            min,
            max
        })
    }
}

export {
    Attribute
}