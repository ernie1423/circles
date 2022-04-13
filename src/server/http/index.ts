import express from 'express';
import { clientPath, httpPort } from './../../config.json';
import { resolve } from 'path';

let server = express();

server.use(express.static(
    resolve(
        __dirname,
        './../../',
        clientPath
    )
))

server.listen(httpPort, () => {
    console.log(`Server is running on port ${httpPort}`);
})