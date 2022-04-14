import WebSocket from 'ws';
import { AbilityInput } from '../Ability';
import { Behavior } from '../Behavior';
import { BehaviorInterface } from '../BehaviorInterface';
import { Unit } from '../Unit';

interface Use {
    id: string;
    data: AbilityInput;
}

interface IncomingData {
    uses?: Use[];
} 

let i = 0;

class PlayerBehavior<E extends Unit = Unit> extends Behavior<E> {
    socket: WebSocket;
    useCalls: Use[];

    constructor(socket: WebSocket, behaviorInterface: BehaviorInterface<E>) {
        super(behaviorInterface);
        
        this.socket = socket;

        this.useCalls = [];

        socket.on('message', (msg, isBinary) => {
            let data: IncomingData = JSON.parse(msg.toString()) as IncomingData;

            if(data.uses){
                data.uses.forEach(newcall => {
                    if(!this.useCalls.find(call => call.id == newcall.id)){
                        this.useCalls.push(newcall);
                    }
                });
            }
        })
    }

    update(){
        this.useCalls.forEach(call => {
            this.behaviorInterface.useAbility(call.id, call.data);
        });
        this.useCalls = [];

        this.socket.send(JSON.stringify(
            this.behaviorInterface.entityData()
        ))
    }
}

export { PlayerBehavior }