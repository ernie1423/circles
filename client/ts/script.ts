interface ItemData {
    id: string;
    name: string
    charge?: {
        max: number,
        current: number
    }
    state: { [key: string]: any } & {
        usable?: boolean
    };
    settings: { [key: string]: any };
    durability: {
        max?: number,
        current: number
    };
}

interface EffectData {
    id: string,
    attributeChanges: { [key: string]: number };
    healthChanges: number,
    chargeChanges: number,
    lifespan: number
}

interface AbilityData {
    id: string,
    name: string,
    charge: {
        max?: number,
        current: number
    },
    settings: { [key: string]: any },
    state: { [key: string]: any } & {
        usable?: boolean,
        sight?: EntityData[]
    }
}

interface AbilityInput {
    position?: {
        x: number,
        y: number
    },
    entity?: string,
    ability?: string,
    effect?: string
}

interface EntityData {
    id: string,
    position: {
        x: number,
        y: number
    },
    health?: {
        current: number,
        max?: number
    };
    charge?: {
        current: number,
        max?: number
    };
    abilities?: AbilityData[];
    items?: ItemData[];
    equippedItems?: ItemData[];
    effects?: EffectData[];
    attributes?: {[key: string]: number};
    state?: { [key: string]: any };
    control?: { [key: string]: { max: number, current: number } };
    name?: string;
}

interface Use {
    id: string;
    data: AbilityInput;
}

interface OutgoingData {
    uses?: Use[];
} 

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let ws = new WebSocket(`ws://${window.location.hostname}:3001`);

let entities: EntityData[] = [];
let controlled: EntityData;

let cameraPosition = {
    x: 0,
    y: 0
}

let cursor = {
    x: 0,
    y: 0,
    toWorld(){
        return {
            x: cameraPosition.x - canvas.width / 2 + this.x,
            y: cameraPosition.y - canvas.height / 2 + this.y
        }
    }
}

document.body.addEventListener('mousemove', (e) => {
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
})

ws.addEventListener('message', (e) => {
    entities = [];
    controlled = JSON.parse(e.data) as EntityData;
    entities.push(controlled);

    let sight: EntityData[] | undefined = controlled.abilities?.find(ability => Array.isArray(ability.state.sight))?.state.sight;
    
    entities.push(...(
        sight
    ?? []));
});

let i = 1;

setInterval(() => {
    if(controlled){
        cameraPosition = {
            x: controlled.position.x,
            y: controlled.position.y
        }
        let data: OutgoingData = {
            uses: []
        }

        let id = controlled.abilities?.find(ability => ability.name == 'pointer')?.id;

        if(id){
            data.uses?.push({
                id: id,
                data: {
                    position: cursor.toWorld()
                }
            })
        }

        ws.send(
            JSON.stringify(data)
        )
    }
    if(ctx){
        ctx.fillStyle = '#161616';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FFF';

        ctx.fillText(entities.length.toString(), 10, 10);

        entities.forEach((e) => {
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