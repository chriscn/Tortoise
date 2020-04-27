const request = require('supertest');
const app = require('../index.js');

describe('GET /', function () {
    it('return JSON and 200 response', function () {
        return request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})
