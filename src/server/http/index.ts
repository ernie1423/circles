import express from 'express';

let server = express();

express.static('client');

server.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`);
})

server.listen(3001, () => {
    console.log('Server is running on port 3001');
})