/* eslint-env node, mocha */
const should = require('should');
const request = require('supertest');

process.env.PORT = 8081;
const server = require('../../../../app');

describe('controllers', () => {
  describe('hello_world', () => {
    describe('POST /v1/monitor', () => {
      it('should be able to add status', (done) => {
        request(server)
          .post('/v1/monitor')
          .set('Accept', 'application/json')
          .send({
            key: 'Process-2018-04-31-14-12-31',
            value: {
              percentage: 0,
            },
          })
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
