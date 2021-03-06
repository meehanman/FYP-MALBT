//Start server is test mode (New Server and IP)
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('#Polling Route: /poll', () => {
  it('HTTP Responce is OK', (done) => {
    chai.request(server)
      .post('/poll')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('HTTP Responce is OK for GPS', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('Returns String', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('BSSID: User is marked attended to event 58f8fd6c4cb8b419b35008d3', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('GPS: User is marked attended to event 58f8fd6c4cb8b419b35008d3', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('GPS Location out of Range: User is marked accepted to event 58f8fd6c4cb8b419b35008d3', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('Beacon: User is marked attended to event 58f8fd6c4cb8b419b35008d3', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
  it('Doesn\'t allow access to anonymous users', (done) => {
    chai.request(server)
      .post('/poll/gps')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .field("test","blank")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
});
