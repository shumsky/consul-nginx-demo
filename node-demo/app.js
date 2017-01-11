const express = require('express');
const msb = require('msb');
const consul = require('consul')();

const NAMESPACE = 'service:discovery:demo';

const app = express();

app.get('/test', (req, resp) => {
    msb.request(NAMESPACE, 'hello', (err, payload) => {
        if (err) {
            return resp.status(500).end();
        }
        resp.status(200).json(payload);
    });
});

app.listen(3000).on('listening', () => {
    consul.agent.service.register({name: 'node-demo'}, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
