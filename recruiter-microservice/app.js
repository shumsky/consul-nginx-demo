const consul = require('consul')(process.env.CONSUL_HOST ? {host: process.env.CONSUL_HOST} : undefined);
const request = require('request');
const ip = require('ip');
const app = require('express')();

app.get('/find', (req, resp) => {
  request(`${process.env.CANDIDATE_URL}/about`, (err, result) => {
    if (err) {
      console.error(`Failed to request candidate: ${err}`);
      return resp.status(500).end();
    }
    resp.send(result.body);
  });
});

app.get('/health', (req, resp) => {
  resp.status(200).json({status: 'UP'});
});

const server = app.listen(3000).on('listening', () => {
  consul.agent.service.register({
    id: `recruiter-microservice-${Math.ceil(Math.random() * 999999)}`,
    name: 'recruiter-microservice',
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
      console.error(`Failed to register in Consul: ${err}`);
      return;
    }
    console.log('Registered in Consul')
  });
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  server.close(() => {
    consul.agent.service.deregister(`recruiter-${Math.ceil(Math.random() * 999999)}`, () => {
      console.log('Deregistered from Consul');
      process.exit(0);
    });
  });
}
