import { Input, InputData } from "./models/Ability";
import { Entity, EntityData } from "./models/Entity";

enum PayloadType {
    Info = 1, // incoming
    Use = 2, // outgoing
    Interact = 3 // outgoing
}

/*
 * Outgoing payloads
 */

interface OutgoingPayload {
    type: PayloadType.Use | PayloadType.Interact,
    data: any
} 

interface Use {
    id: string;
    data: InputData;
}

interface UsePayload extends OutgoingPayload {
    type: PayloadType.Use,
    data: {
        abilities?: Use[],
        items?: Use[]
    }
}

interface InteractPayload extends OutgoingPayload {
    type: PayloadType.Interact,
    data: {
        id: string,
        data?: any
    }
}

type OutgoingPayloads = UsePayload | InteractPayload;

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

    send(data: OutgoingPayloads){
        this.inner.send(
            JSON.stringify(
                data
            )
        )
    }

    useAbility(id: string, data: InputData){

        this.send({
            type: PayloadType.Use,
            data: {
                abilities: [{
                    id: id,
                    data: {
                        position: data.position
                    }
                }]
            }
        });
    }

    useAbilities(...abilities: [string, InputData][]){
        this.send({
            type: PayloadType.Use,
            data: {
                abilities: abilities.map(
                    ([id, data]) => ({
                        id: id,
                        data: data
                    })
                ) as Use[]
            }
        });
    }
}

export {
    Socket,
    OutgoingPayloads,
    Use
}