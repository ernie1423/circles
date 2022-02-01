const { sqrt } = Math;

class Vector {
    x: number;
    y: number;

    constructor(x?: number, y?: number){
        this.x = x || 0;
        this.y = y || 0;
    }

    distance(aVector: Vector): number {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return sqrt((x1 - x2)**2 + (y1 - y2)**2);
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    summary(aVector: Vector): Vector {
        const { x: x1, y: y1 } = this;
        const { x: x2, y: y2 } = aVector;

        return new Vector(x1 + x2, y1 + y2);
    }

    add(aVector: Vector){
        this.x += aVector.x;
        this.y += aVector.y;
    }

    set(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}

export {
    Vector
}