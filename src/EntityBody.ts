import { Vector } from "./utils";

enum EntityBodyType {
    Other = 0,
    Circle = 1
}

interface EntityBodyData {
    name: EntityBodyType
    position: {
        x: number,
        y: number
    }
}

interface CircleData extends EntityBodyData {
    name: EntityBodyType.Circle,
    radius: number
}

class Circle implements CircleData {
    name: EntityBodyType.Circle;
    position: Vector;
    radius: number;

    constructor(position: Vector, radius: number){
        this.name = EntityBodyType.Circle;

        this.position = position;
        this.radius = radius;
    }

    intersects(body: Circle): boolean {
        return this.position.distance(body.position) <= (this.radius + body.radius);
    }

    data(): CircleData {
        return {
            name: this.name,
            radius: this.radius,
            position: {
                x: this.position.x,
                y: this.position.y
            }
        }
    }
}

type EntityBodies = Circle;

type EntityBodiesData = CircleData;

export {
    EntityBodyType,
    Circle,
    EntityBodies,
    EntityBodiesData
}