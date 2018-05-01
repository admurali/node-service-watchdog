/* eslint-env node, mocha */
const should = require('should');
const request = require('supertest');

process.env.PORT = 8081;
const server = require('../../../../app');

describe('controllers', () => {
  describe('hello_world', () => {
    describe('GET /v1/hello', () => {
      it('should return a default string', (done) => {
        request(server)
          .get('/v1/hello')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.eql('Hello, stranger!');

            done();
          });
      });

      it('should accept a name parameter', (done) => {
        request(server)
          .get('/v1/hello')
          .query({
            name: 'Scott',
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);

            res.body.should.eql('Hello, Scott!');

            done();
          });
      });
    });
  });
});
