import { Vector } from "./utils";

interface MouseButtonState<T> {
    left: T,
    middle: T,
    right: T
}

class Cursor {
    position: Vector;

    pressed: MouseButtonState<number>;

    pressedNow: MouseButtonState<boolean>;

    boundElement: HTMLCanvasElement;

    constructor(boundElement: HTMLCanvasElement){
        this.boundElement = boundElement;

        this.position = new Vector(0, 0);

        this.pressed = {
            left: 0,
            middle: 0,
            right: 0
        }

        this.pressedNow = {
            left: false,
            middle: false,
            right: false
        }

        this.boundElement.addEventListener('mousedown', e => {
            switch(e.button){
                case 0:
                    this.pressedNow.left = true;
                    break;
                case 1:
                    this.pressedNow.middle = true;
                    break;
                case 2:
                    this.pressedNow.right = true;
                    break; 
            }
        });

        this.boundElement.addEventListener('mouseup', e => {
            switch(e.button){
                case 0:
                    this.pressedNow.left = false;
                    break;
                case 1:
                    this.pressedNow.middle = false;
                    break;
                case 2:
                    this.pressedNow.right = false;
                    break;
            }
        });

        this.boundElement.addEventListener('mousemove', e => {
            this.position.set(
                e.x,
                e.y
            )
        })
    }

    update(){
        Object.entries(this.pressedNow).forEach(([buttonName, pressed]) => {
            if(pressed){
                this.pressed[buttonName as keyof MouseButtonState<boolean>]++;
            }
            else {
                this.pressed[buttonName as keyof MouseButtonState<boolean>] = 0;
            }
        })
    }

    toWorld(cameraPosition: Vector){
        return new Vector(
            this.position.x - this.boundElement.width / 2 + cameraPosition.x,
            this.position.y - this.boundElement.height / 2 + cameraPosition.y
        );
    }
}

export { Cursor }