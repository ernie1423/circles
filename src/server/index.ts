import { WebSocketServer } from 'ws';
import { Layer } from '../Layer';
import { Unit } from '../Unit';
import { PlayerBehavior } from '../content/PlayerBehavior';
import { Vision } from '../content/Vision';
import { Entity } from '../Entity';
import { wsPort, tps } from './../config.json';

const layer = new Layer();

const server = new WebSocketServer({ port: wsPort });

new Entity(0, 50, layer);

server.on('connection', (socket) => {
    let u = new Unit(0, 0, layer);
        u.abilities.push(new Vision(u, 100));
    new PlayerBehavior(socket, u.behaviorInterface);
});

setInterval(() => {
    layer.update();
}, 1000/tps);