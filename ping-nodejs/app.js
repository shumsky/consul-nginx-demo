const express = require('express');
const msb = require('msb');
const consul = require('consul')(process.env.CONSUL_HOST ? {host: process.env.CONSUL_HOST} : undefined);

const NAMESPACE = 'service:discovery:demo';
const PORT = Number(process.env.HTTP_PORT) || 3002;

const app = express();

app.get('/ping', (req, resp) => {
    msb.request(NAMESPACE, 'ping', (err, payload) => {
        if (err) {
            return resp.status(500).end();
        }
        const response = {
            from: `ping-nodejs-${PORT}`,
            message: payload
        };
        resp.status(200).json(response);
    });
});

app.get('/health', (req, resp) => {
    resp.status(200).json({status: 'UP'});
});

const server = app.listen(PORT).on('listening', () => {
    consul.agent.service.register({
        id: `ping-nodejs-${PORT}`,
        name: 'ping-nodejs',
        address: '172.28.96.33',
        port: PORT,
        check: {
            name: 'HTTP API',
            http: `http://172.28.96.33:${PORT}/health`,
            interval: '15s',
            timeout: '1s'
        }
    }, (err) => {
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
    consul.agent.service.deregister(`ping-nodejs-${PORT}`, () => {
        console.log('Deregistered from Consul');
        process.exit(0);
    });
}
