const express = require('express');
const msb = require('msb');
const consul = require('consul')(process.env.CONSUL_HOST ? {host: process.env.CONSUL_HOST} : undefined);
const ip = require('ip');

const NAMESPACE = 'service:discovery:demo';

const app = express();

app.get('/ping', (req, resp) => {
    msb.request(NAMESPACE, 'ping', (err, payload) => {
        if (err) {
            return resp.status(500).end();
        }
        const response = {
            from: `ping-nodejs-${ip.address()}`,
            message: payload
        };
        resp.status(200).json(response);
    });
});

app.get('/health', (req, resp) => {
    resp.status(200).json({status: 'UP'});
});

const server = app.listen(3000).on('listening', () => {
    consul.agent.service.register({
        id: `ping-nodejs-${ip.address()}`,
        name: 'ping-nodejs',
        address: ip.address(),
        port: 3000,
        check: {
            name: 'HTTP API',
            http: `http://${ip.address()}:3000/health`,
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
    consul.agent.service.deregister(`ping-nodejs-${PUBLIC_PORT}`, () => {
        console.log('Deregistered from Consul');
        process.exit(0);
    });
}
