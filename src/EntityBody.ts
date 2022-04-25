import { Vector } from "./utils";

enum EntityBodyType {
    circle = 0
}

interface EntityBody {
    name: EntityBodyType
    position: Vector
    intersects: (body: any) => boolean
}

class Circle implements EntityBody {
    name: EntityBodyType.circle;
    position: Vector;
    radius: number;

    constructor(position: Vector, radius: number){
        this.name = EntityBodyType.circle;

        this.position = position;
        this.radius = radius;
    }

    intersects(body: Circle): boolean {
        return this.position.distance(body.position) <= (this.radius + body.radius);
    }
}

type EntityBodies = Circle;

export {
    EntityBodyType,
    EntityBody,
    Circle,
    EntityBodies
}