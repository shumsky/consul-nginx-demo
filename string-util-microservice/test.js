const app = require('./app.js');

const nock = require('nock');
const request = require('request');
const assert = require('assert');

process.env.CAPITALIZER_URL = 'http://capitalizer';

describe('string-util-microservice', () => {
  it('should invoke capitalizer', (done) => {
    nock(process.env.CAPITALIZER_URL).get('/capitalize?text=it_works').reply(200, 'IT_WORKS');

    request('http://localhost:3000/to-upper-case?text=it_works', (err, resp) => {
      if (err) return done(err);
      assert.equal(resp.statusCode, 200);
      assert.equal(resp.body, 'IT_WORKS');
      done();
    });
  });
});
