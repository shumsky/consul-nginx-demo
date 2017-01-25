const msb = require('msb');
const express = require('express');
const ip = require('ip');

const NAMESPACE = 'consul:demo';

module.exports = router = express.Router();

router.get('/ping', (req, resp) => {
    msb.request(NAMESPACE, 'ping', (err, payload) => {
        const response = {
            from: `ping-nodejs-${ip.address()}`,
            message: payload
        };
        resp.status(200).json(response);
    });
});

router.get('/health', (req, resp) => {
    resp.status(200).json({status: 'UP'});
});
