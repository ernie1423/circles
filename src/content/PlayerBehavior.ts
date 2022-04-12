import WebSocket from 'ws';
import { Behavior } from '../Behavior';
import { BehaviorInterface } from '../BehaviorInterface';
import { Unit } from '../Unit';

class PlayerBehavior<E extends Unit = Unit> extends Behavior<E> {
    socket: WebSocket;

    constructor(socket: WebSocket, behaviorInterface: BehaviorInterface<E>) {
        super(behaviorInterface);
        
        this.socket = socket;

        socket.on('message', (msg, isBinary) => {
            
        })
    }

    update(){
        this.socket.send(JSON.stringify(
            this.behaviorInterface.entityData()
        ))
    }
}

export { PlayerBehavior }