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

app.get('/health', (req, resp) => {
    resp.status(200).end();
});

const server = app.listen(3002).on('listening', () => {
    consul.agent.service.register({name: 'node-demo'}, (err) => {
        if (err) {
            console.error(err);
        }
        console.log('Registered in Consul');
    });
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    server.close();
    consul.agent.service.deregister('node-demo', () => {
        console.log('Deregistered from Consul');
        process.exit(0);
    });
}
