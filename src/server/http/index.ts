import express from 'express';
import { clientPath, httpPort } from './../../config.json';
import { resolve } from 'path';

let server = express();

server.use('/client', express.static(
    resolve(
        __dirname,
        './../../',
        clientPath
    ),
    {
        extensions: ['js', 'css', 'html']
    }
))

server.use('/content', express.static(
    resolve(
        __dirname,
        './../../content'
    ),
    {
        extensions: ['json', 'svg']
    }
))

server.listen(httpPort, () => {
    console.log(`Server is running on port ${httpPort}`);
})