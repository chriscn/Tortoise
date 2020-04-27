const request = require('supertest');
const app = require('../index.js');

describe('GET /', function () {
    it('return 200 response', function () {
        return request(app)
            .get('/')
            .expect(200)
    })
})
