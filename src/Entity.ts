class Entity {
    position: {
        x: number,
        y: number
    }
    constructor(x: number, y: number){
        this.position = {
            x: x,
            y: y
        }
    }
    update(): void {
        
    }
}

export {
    Entity
}