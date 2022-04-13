import express from 'express';
import { clientPath } from './../../config.json';
import { resolve } from 'path';

let server = express();

server.use(express.static(
    resolve(
        __dirname,
        './../../',
        clientPath
    )
))

server.listen(3001, () => {
    console.log('Server is running on port 3001');
})