import WebSocket from "ws";

setTimeout(() => {
    console.log('Connecting...');

    let client = new WebSocket('ws://127.0.0.1:3000');

    client.on('message', (msg) => {
        console.log(JSON.parse(msg.toString()));
    })
}, 10000);
