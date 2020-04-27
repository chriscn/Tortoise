const request = require('supertest');
const app = require('../app/app');
const nanoid = require('nanoid');

const id = nanoid.nanoid(16);

describe('sending fake ID', () => {
    it('sending ID ', function () {
        return request(app)
            .get(`/${id}/ison`)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.status = "true";
                res.id = id;
            });
    });
    it('should get on from that id', function () {
        return true; // haven't writtten the code yet
    });
    it('should delete that id', function () {
        return true;
    });
})

describe('id not in system', function () {
    it('should get status for unknown id', function () {
        return false;
    });
    it('should delete unknown id', function () {

    });
});
