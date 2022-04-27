import { Entity } from './Entity';

class Team {
    members: Entity[]
    
    constructor(members: Entity[] = []){
        this.members = members;
    }
}

export {
    Team
}