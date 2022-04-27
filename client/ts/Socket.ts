import { AbilityInput, AbilityInputData } from "./models/Ability";
import { Entity, EntityData } from "./models/Entity";

interface Use {
    id: string;
    data: AbilityInputData
} 

interface OutgoingData {
    uses: Use[];
}

class Socket {
    inner!: WebSocket;
    entities: Entity[];
    controlled?: Entity;

    constructor(host: string, port: number){
        this.entities = [];

        this.connect(host, port);
    }

    connect(host: string, port: number){
        this.inner?.close();
        this.inner = new WebSocket(`ws://${host}:${port}`);

        this.inner.addEventListener('open', () => {
            
        })

        this.inner.addEventListener('message', (e) => {
            let payload = JSON.parse(e.data) as EntityData;

            if(!this.controlled){
                this.controlled = new Entity(payload);
                console.log(payload);
            }
            else {
                this.controlled.update(payload);
            }

            let datas: undefined | EntityData[] = payload.abilities?.find(ability => ability.name == 'vision')?.state.sight;

            if(datas){
                datas.forEach(rawEntity => {
                    let found = this.entities.find(e => e.id == rawEntity.id);

                    if(!found){
                        this.entities.push(new Entity(rawEntity));
                    }
                    else {
                        found.update(rawEntity);
                    }
                })

                this.entities.filter(entity => !datas?.find(eData => eData.id == entity.id)).forEach(entity => {
                    entity.beingRemoved = true;
                })
            }
        })
    }

    send(data: OutgoingData){
        this.inner.send(
            JSON.stringify(
                data
            )
        )
    }

    useAbility(id: string, data: AbilityInputData){

        this.send({
            uses: [{
                id: id,
                data: {
                    position: data.position
                }
            }]
        });
    }

    useAbilities(...abilities: [string, AbilityInputData][]){
        this.send({
            uses: abilities.map(
                ([id, data]) => ({
                    id: id,
                    data: data
                })
            ) as Use[]
        });
    }
}

export {
    Socket,
    OutgoingData,
    Use
}