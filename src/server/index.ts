import { WebSocketServer } from 'ws';
import { Layer } from '../Layer';
import { Unit } from '../Unit';
import { PlayerBehavior } from '../content/PlayerBehavior';
import { Vision } from '../content/Vision';
import { Entity } from '../Entity';
import { wsPort, tps } from './../config.json';
import { Pointer } from '../content/Pointer';
import { Movement } from '../content/Movement';

const layer = new Layer();

const server = new WebSocketServer({ port: wsPort });

let e = new Entity(0, 50, layer);
    e.abilities.push(new Movement(e, 10));

new Entity(120, 0, layer);
    
server.on('connection', (socket) => {
    let u = new Unit(0, 0, layer);
        u.abilities.push(new Vision(u, 420));
        u.abilities.push(new Pointer(u));
    new PlayerBehavior(socket, u.behaviorInterface);

    socket.on('close', () => {
        u.beingRemoved = true;
    })
});

let i = 0;

setInterval(() => {
    layer.update();

    e.abilities[0].softUse({
        position: {
            x: Math.cos(i*Math.PI/100) * 120,
            y: Math.sin(i*Math.PI/100) * 120
        }
    })

    i++;
    
}, 1000/tps);