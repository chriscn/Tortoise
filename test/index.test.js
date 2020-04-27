const request = require('supertest');
const app = require('../app/app');

describe('GET /', function () {
    it('return JSON and 200 response', function () {
        return request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('GET 404', function () {
    it('should return 404 for unknown page', function () {
        return request(app)
            .get('/foo/bar')
            .expect(404)
    });
});
