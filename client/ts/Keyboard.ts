class Keyboard {
    pressedNow: { [keyName: string]: boolean }
    pressed: { [keyName: string]: number }

    blocked: boolean;
    boundElement: HTMLElement;

    constructor(boundElement: HTMLElement){
        this.pressedNow = {};
        this.pressed = {};

        this.blocked = false;
        this.boundElement = boundElement;

        this.boundElement.addEventListener('keydown', (e) => {
            if(!this.blocked)
                this.pressedNow[e.code] = true;
        });

        this.boundElement.addEventListener('keyup', (e) => {
            if(!this.blocked)
                this.pressedNow[e.code] = false;
        });
    }

    block(reverse: boolean){
        if(!reverse){
            this.blocked = true;
            this.pressedNow = {};
        }
        else {
            this.blocked = false;
        }
    }

    update(){
        Object.entries(this.pressed).forEach(([keyName, pressedFor]) => {
            if(!this.pressedNow[keyName]){
                this.pressed[keyName] = 0;
            }
        });

        Object.entries(this.pressedNow).forEach(([keyName, pressed]) => {
            if(this.pressedNow[keyName]){
                if(keyName in this.pressed){
                    this.pressed[keyName]++;
                }
                else {
                    this.pressed[keyName] = 1;
                }
            }
        });
    }
}

export {
    Keyboard
}