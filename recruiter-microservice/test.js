const app = require('./app.js');

const nock = require('nock');
const request = require('request');
const assert = require('assert');

process.env.CANDIDATE_URL = 'http://candidates';
process.env.RECRUITER_NAME = 'Mocha';

describe('recruiter-microservice', () => {
  it('should request candidate info', (done) => {
    nock(process.env.CANDIDATE_URL).get('/about').reply(200, 'Hello');

    request('http://localhost:3000/find', (err, resp) => {
      if (err) return done(err);
      assert.equal(resp.statusCode, 200);
      assert.ok(resp.body.indexOf(process.env.RECRUITER_NAME) > -1);
      assert.ok(resp.body.indexOf('Hello') > -1);
      done();
    });
  });
});
