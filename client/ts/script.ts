import { Socket } from './Socket';
import { Keyboard } from './Keyboard';
import { Vector } from './utils';
import { Cursor } from './Cursor';
import { EntityType } from './models/Entity';

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

let cellSize = 500;

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

        ctx.strokeStyle = '#FFF8';

        ctx.beginPath();
        for(let i = Math.floor(canvas.width / cellSize) + 1; i > -1; i--){
            ctx.moveTo(
                Math.round(i * cellSize - cameraPosition.x % cellSize + (canvas.width / 2 - cellSize)) + 0.5,
                0
            )
            ctx.lineTo(
                Math.round(i * cellSize - cameraPosition.x % cellSize + (canvas.width / 2 - cellSize)) + 0.5,
                canvas.height
            )
        }
        for(let i = Math.floor(canvas.height / cellSize) + 1; i > -1; i--){
            ctx.moveTo(
                0,
                Math.round(i * cellSize - cameraPosition.y % cellSize + (canvas.height / 2 - cellSize)) + 0.5
            )
            ctx.lineTo(
                canvas.width,
                Math.round(i * cellSize - cameraPosition.y % cellSize + (canvas.height / 2 - cellSize)) + 0.5
            )
        }
        ctx.stroke();


        ctx.fillStyle = '#FFF';

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

            let r = e.body ? e.body.radius : 10;
            ctx.fillStyle = '#FFF';

            ctx.beginPath();
                ctx.arc(
                    canvas.width / 2 - cameraPosition.x + position.x,
                    canvas.height / 2 - cameraPosition.y + position.y,
                    r,
                    0,
                    Math.PI*2
                );
            ctx.fill();
            
            if(!e.health || !e.health?.max || e.type == EntityType.Projectile ) return;
            let radius = (e.body) ? e.body.radius : 10;

            ctx.strokeStyle = '#0008';

            ctx.beginPath();
                ctx.moveTo(
                    canvas.width / 2 - cameraPosition.x + position.x - radius * 1.2,
                    canvas.height / 2 - cameraPosition.y + position.y - radius * 1.2
                )
                ctx.lineTo(
                    canvas.width / 2 - cameraPosition.x + position.x + radius * 1.2,
                    canvas.height / 2 - cameraPosition.y + position.y - radius * 1.2
                )
            ctx.stroke();

            ctx.strokeStyle = '#FFF';

            let HPRatio = e.health.current / e.health.max;

            ctx.beginPath();
                ctx.moveTo(
                    canvas.width / 2 - cameraPosition.x + position.x - radius * 1.2,
                    canvas.height / 2 - cameraPosition.y + position.y - radius * 1.2
                )
                ctx.lineTo(
                    canvas.width / 2 - cameraPosition.x + position.x - radius * 1.2 + radius * 2.4 * HPRatio,
                    canvas.height / 2 - cameraPosition.y + position.y - radius * 1.2
                )
            ctx.stroke();
        })

        ctx.strokeStyle = '#FFF';
        ctx.fillStyle = '#FFF';

        if(socket.controlled){

            if(socket.controlled.health && socket.controlled.health?.max){
                 
                ctx.beginPath();
                    ctx.moveTo(canvas.width * 0.35, canvas.height * 0.75);
                    ctx.lineTo(canvas.width * 0.65, canvas.height * 0.75);
                ctx.stroke();

                ctx.fillRect(
                    canvas.width * 0.35,
                    canvas.height * 0.75 + 2,
                    socket.controlled.health.current / socket.controlled.health.max * canvas.width * 0.3,
                    5
                ) 
 
                ctx.textAlign = 'right';
                ctx.font = '12px Ubuntu mono';

                ctx.fillText(
                    `${socket.controlled.health.current}/${socket.controlled.health.max}`,
                    canvas.width * 0.65,
                    canvas.height * 0.75 + 19
                ) 
            }
             
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
    }
}, 1000/60);