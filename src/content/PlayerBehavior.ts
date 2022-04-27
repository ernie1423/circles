import WebSocket from 'ws';
import { Input } from '../Ability';
import { Behavior } from '../Behavior';
import { BehaviorInterface } from '../BehaviorInterface';
import { Unit } from '../Unit';


enum PayloadType {
    Info = 1, // outgoing
    Use = 2, // incoming
    Interact = 3 // incoming
}

/*
 * Incoming payloads
 */

interface IncomingPayload {
    type: PayloadType.Use | PayloadType.Interact,
    data: any
} 

interface Use {
    id: string;
    data: Input;
}

interface UsePayload extends IncomingPayload {
    type: PayloadType.Use,
    data: {
        abilities?: Use[],
        items?: Use[]
    }
}

interface InteractPayload extends IncomingPayload {
    type: PayloadType.Interact,
    data: {
        id: string,
        data?: any
    }
}

type IncomingPayloads = UsePayload | InteractPayload;

class PlayerBehavior<E extends Unit = Unit> extends Behavior<E> {
    socket: WebSocket;
    AbilityUseCalls: Use[];
    ItemUseCalls: Use[];

    constructor(socket: WebSocket, behaviorInterface: BehaviorInterface<E>) {
        super(behaviorInterface);
        
        this.socket = socket;

        this.AbilityUseCalls = [];
        this.ItemUseCalls = [];

        socket.on('message', (msg, isBinary) => {
            let payload: IncomingPayloads = JSON.parse(msg.toString()) as IncomingPayloads;

            if(payload.type == PayloadType.Use)
                if(payload.data){
                    payload.data.abilities?.forEach((newcall: Use) => {
                        if(!this.AbilityUseCalls.find(call => call.id == newcall.id)){
                            this.AbilityUseCalls.push(newcall);
                        }
                    });

                    payload.data.items?.forEach((newcall: Use) => {
                        if(!this.ItemUseCalls.find(call => call.id == newcall.id)){
                            this.ItemUseCalls.push(newcall);
                        }
                    });
                }
        })
    }

    update(){
        this.AbilityUseCalls.forEach(call => {
            this.behaviorInterface.useAbility(call.id, call.data);
        });
        this.AbilityUseCalls = [];

        this.ItemUseCalls.forEach(call => {
            this.behaviorInterface.useItem(call.id, call.data);
        });
        this.ItemUseCalls = [];

        this.socket.send(JSON.stringify(
            this.behaviorInterface.entityData()
        ))
    }
}

export { PlayerBehavior }