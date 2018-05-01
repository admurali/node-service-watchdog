/* eslint-env node, mocha */
const should = require('should');
const request = require('supertest');

process.env.PORT = 8081;
const server = require('../../../../app');

const object = {
  key: 'Process-2018-04-31-14-12-31',
  value: {
    percentage: 0,
  },
};
describe('controllers', () => {
  describe('monitor', () => {
    describe('POST /v1/monitor', () => {
      it('should be able to add status', (done) => {
        request(server)
          .post('/v1/monitor')
          .set('Accept', 'application/json')
          .send({
            key: object.key,
            value: object.value,
          })
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.eql(true);
            done();
          });
      });
    });
    describe('GET /v1/monitor', () => {
      it('should be able to get status', (done) => {
        request(server)
          .get('/v1/monitor')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            console.log(res.body);
            done();
          });
      });
    });
    describe(`GET /v1/monitor/${object.key}`, () => {
      it('should be able to get status by key', (done) => {
        request(server)
          .get(`/v1/monitor/${object.key}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            console.log(res.body);
            done();
          });
      });
    });
    describe(`DELETE /v1/monitor/${object.key}`, () => {
      it('should be able to delete status by key', (done) => {
        request(server)
          .delete(`/v1/monitor/${object.key}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            console.log(res.body);
            done();
          });
      });
    });
  });
});
