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

    socket.entities.forEach((entity, i) => {
        if(entity.beingRemoved)
            socket.entities.splice(i, 1);
    })

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

        if(movementAbility && !(movementVector.x == 0 && movementVector.y == 0)){
            movementAbility.use({
                position: {
                    vector: movementVector,
                    relative: true
                }
            }, socket);
        }


        let blasterAbility = socket.controlled.abilities?.find(ability => ability.name == 'blaster');
        
        if(cursor.pressed.left){
            if(blasterAbility){
                blasterAbility.use({
                    position: {
                        vector: cursor.toWorld(cameraPosition),
                        relative: false
                    }
                }, socket)
            }
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
                    (socket.controlled.body) ? socket.controlled.body.radius : 10,
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
                    e.body ? e.body.radius : 10,
                    0,
                    Math.PI*2
                );
            ctx.fill();
        })
    }
}, 1000/60);