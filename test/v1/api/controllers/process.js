/* eslint-env node, mocha */
const should = require('should');
const request = require('supertest');

process.env.PORT = 8081;
const server = require('../../../../app');

const key = process.pid;
const value = {
  progress: 10,
};

describe('controllers', () => {
  describe('process', () => {
    describe('POST /v1/process', () => {
      it('should be able to add process as a monitor', (done) => {
        request(server)
          .put(`/v1/process/${key}`)
          .set('Accept', 'application/json')
          .send(value)
          .expect(200)
          .end((err, res) => {
            console.log(`Current process id ${key} with value ${JSON.stringify(value)}`);
            should.not.exist(err);
            res.body.should.eql(true);
            done();
          });
      });
    });
  });
  describe(`GET /v1/process/${key}`, () => {
    it('should be able to get process status by process id', (done) => {
      request(server)
        .get(`/v1/process/${key}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          console.log(res.body);
          done();
        });
    });
  });
  describe('GET /v1/process', () => {
    it('should be able to get all process status', (done) => {
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
});

// describe('controllers', () => {
//   describe('process', () => {
//     describe('POST /v1/process', () => {
//       it('should be able to add process as a monitor', (done) => {
//         request(server)
//           .post('/v1/monitor')
//           .set('Accept', 'application/json')
//           .send({
//             key: object.key,
//             value: object.value,
//           })
//           .expect(200)
//           .end((err, res) => {
//             should.not.exist(err);
//             res.body.should.eql(true);
//             done();
//           });
//       });
//     });
//     describe('GET /v1/process', () => {
//       it('should be able to get all process status', (done) => {
//         request(server)
//           .get('/v1/monitor')
//           .set('Accept', 'application/json')
//           .expect(200)
//           .end((err, res) => {
//             should.not.exist(err);
//             console.log(res.body);
//             done();
//           });
//       });
//     });
//     describe(`GET /v1/process/${object.key}`, () => {
//       it('should be able to get process status by process id', (done) => {
//         request(server)
//           .get(`/v1/process/${object.key}`)
//           .set('Accept', 'application/json')
//           .expect(200)
//           .end((err, res) => {
//             should.not.exist(err);
//             console.log(res.body);
//             done();
//           });
//       });
//     });
//     describe(`DELETE /v1/process/${object.key}`, () => {
//       it('should be able to remove process from monitor', (done) => {
//         request(server)
//           .delete(`/v1/process/${object.key}`)
//           .set('Accept', 'application/json')
//           .expect(200)
//           .end((err, res) => {
//             should.not.exist(err);
//             console.log(res.body);
//             done();
//           });
//       });
//     });
//   });
// });
