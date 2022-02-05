const { sqrt, atan2 } = Math;

class Vector {
    x: number;
    y: number;

    constructor(x?: number, y?: number){
        this.x = x || 0;
        this.y = y || 0;
    }

    set(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    add(aVector: Vector){
        this.x += aVector.x;
        this.y += aVector.y;
    }

    summary(aVector: Vector): Vector {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return new Vector(x1 + x2, y1 + y2);
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    distance(aVector: Vector): number {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return sqrt((x1 - x2)**2 + (y1 - y2)**2);
    }

    angleTo(aVector: Vector): number {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return atan2(y2 - y1, x2 - x1);
    }
}

function clamp(current: number, min: number, max: number): number {
    if(min > max)
        throw new Error('"min" cannot be higher than "max" value.');
    

    if(current < min)
        return min;
    
    if(current > max)
        return max;

    return current;
}

export {
    Vector,
    clamp
}