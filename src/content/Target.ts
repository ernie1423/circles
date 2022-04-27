import { Layer } from '../Layer';
import { Unit } from '../Unit';
import { Chase } from './Chase';
import { Movement } from './Movement';
import { Vision } from './Vision';

class Target extends Unit {
    constructor(x: number, y: number, layer: Layer){
        super(x, y, layer);

        this.abilities.push(
            new Movement(this, 1),
            new Vision(this, 100)
        );

        this.setBehavior(new Chase(this.behaviorInterface, 100));
    }
}

export {
    Target
}