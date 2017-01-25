const consul = require('consul')(process.env.CONSUL_HOST ? {host: process.env.CONSUL_HOST} : undefined);
const ip = require('ip');
const app = require('express')();
const routes = require('./routes');

const SERVICE_ID = `ping-nodejs-${ip.address()}`;

app.use('/', routes);

const server = app.listen(3000).on('listening', () => {
    consul.agent.service.register({
        id: SERVICE_ID,
        name: 'ping-nodejs',
        address: ip.address(),
        port: 3000,
        check: {
            name: 'HTTP API',
            http: `http://${ip.address()}:3000/health`,
            interval: '15s',
            timeout: '1s'
        }
    }, () => console.log('Registered in Consul'));
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    server.close(() => {
        consul.agent.service.deregister(SERVICE_ID, () => {
            console.log('Deregistered from Consul');
            process.exit(0);
        });
    });
}
