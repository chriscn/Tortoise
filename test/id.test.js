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

    it('should get 1 from status', function () {
        return request(app)
            .get(`/${id}/status`)
            .expect(200)
            .expect('1');
    });

    it('should delete that id', function () {
        return request(app)
            .delete(`/${id}/`)
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
                "status": "not-found",
                "id": id
            });
    });
    it('should delete unknown id', function () {
        return request(app)
            .delete(`/${id}/`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
                "status": "not-found",
                "id": id
            });
    });
});
