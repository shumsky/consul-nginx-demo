const consul = require('consul')(process.env.CONSUL_HOST ? {host: process.env.CONSUL_HOST} : undefined);
const ip = require('ip');
const app = require('express')();

const SERVICE_ID = 'string-util-microservice-0';

app.get('/to-upper-case', (req, resp) => {
  request('http://localhost:8080/capitalize', (err, result) => {
      if (err) return resp.status(500).end();
      resp.send(result);
  });
});

app.get('/health', (req, resp) => {
  resp.status(200).json({status: 'UP'});
});

const server = app.listen(3000).on('listening', () => {
    consul.agent.service.register({
        id: SERVICE_ID,
        name: 'string-util-microservice',
        address: ip.address(),
        port: 3000,
        check: {
            name: 'HTTP API',
            http: `http://${ip.address()}:3000/health`,
            interval: '10s',
            timeout: '1s'
        }
    }, (err) => {
        if (err) {
            console.log('Failed to register in Consul');
            return;
        }
        console.log('Registered in Consul')
    });
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
