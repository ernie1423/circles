import express from 'express';
import { clientPath, httpPort } from './../../config.json';
import { resolve } from 'path';

let server = express();

server.use(express.static(
    resolve(
        __dirname,
        './../../',
        clientPath
    ),
    {
        extensions: ['js', 'css', 'html']
    }
))

server.listen(httpPort, () => {
    console.log(`Server is running on port ${httpPort}`);
})