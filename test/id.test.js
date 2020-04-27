const request = require('supertest');
const app = require('../app/app');
const nanoid = require('nanoid');

describe('sending fake ID', () => {
    let id = nanoid.nanoid(16);

    it('sending ID ', function () {
        return request(app)
            .get(`/${id}/ison`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                "id": id,
                "status": "success"
            });
    });
    it('should get on from that id', function () {
        return request(app)
            .get(`/${id}/`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                "id": id,
                "status": "on"
            });
    });
    it('should delete that id', function () {
        return request(app)
            .get(`/${id}/delete`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                "id": id,
                "status": "success"
            });
    });
})

describe('id not in system', function () {
    let id = nanoid.nanoid(16);

    it('should get status for unknown id', function () {
        return request(app)
            .get(`/${id}/`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                "error": "not-found",
                "id": id
            });
    });
    it('should delete unknown id', function () {

    });
});
