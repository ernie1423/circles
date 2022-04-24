import { Socket } from './Socket';
import { Keyboard } from './Keyboard';
import { Vector } from './utils';
import { Cursor } from './Cursor';

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.className = 'centered';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const ctx = canvas.getContext('2d');

let socket = new Socket(window.location.hostname, 3001);

let cameraPosition: Vector = new Vector(0, 0);
let cursor = new Cursor(canvas);
let keyboard = new Keyboard(document.body);

let movementVector = new Vector(0, 0);

setInterval(() => {
    keyboard.update();
    cursor.update();

    if(socket.controlled){
        cameraPosition.set(
            socket.controlled.position.x,
            socket.controlled.position.y
        );

        movementVector.set(0, 0);

        let movementAbility = socket.controlled.abilities?.find(ability => ability.name == 'movement');
        let speed: number = movementAbility?.attributes?.speed?.value || 0;

        if(keyboard.pressed['KeyW'])
            movementVector.y += -speed * 3;
            
        if(keyboard.pressed['KeyA'])
            movementVector.x += -speed * 3;
            
        if(keyboard.pressed['KeyS'])
            movementVector.y += speed * 3;
            
        if(keyboard.pressed['KeyD'])
            movementVector.x += speed * 3;

        if(movementAbility){
            movementAbility.use({
                position: {
                    vector: movementVector,
                    relative: true
                }
            }, socket);
        }
    }

    if(ctx){
        ctx.fillStyle = '#161616';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FFF';

        ctx.fillText(socket.entities.length.toString(), 10, 10);

        if(socket.controlled){
            ctx.beginPath();
                ctx.arc(
                    canvas.width / 2,
                    canvas.height / 2,
                    10,
                    0,
                    Math.PI*2
                );
            ctx.fill();
        }

        socket.entities.forEach((e) => {
            let { position } = e;

            ctx.beginPath();
                ctx.arc(
                    canvas.width / 2 - cameraPosition.x + position.x,
                    canvas.height / 2 - cameraPosition.y + position.y,
                    10,
                    0,
                    Math.PI*2
                );
            ctx.fill();
        })
    }
}, 1000/60);