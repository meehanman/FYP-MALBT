//Start server is test mode (New Server and IP)
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe("Place Route: GET /place",function(){
  it('HTTP Responce is OK', (done) => {
    chai.request(server)
      .get('/place')
      .set('Authorization', "Basic dGVzdC5lbWFpbEBkZWFuLnRlY2hub2xvZ3k6UGFzc3dvcmQ=")
      .end(function(err, res) {
        res.status.should.eql(200);
        done();
      });
  });
});

describe('#Place Route: DELETE /place/:id', () => {
  it('Place deleted', (done) => {
    done();
  });
  it('Returns correct object', (done) => {
    done();
  });
  it('Doesn\'t allow access to anonymous users', (done) => {
    done();
  });
  it('Doesn\'t allow access to non-admin users', (done) => {
    done();
  });
});


describe('#Place Route: PUT /place', () => {
  it('Place edited with new name', (done) => {
    done();
  });
  it('Returns correct object', (done) => {
    done();
  });
  it('Doesn\'t allow access to anonymous users', (done) => {
    done();
  });
  it('Doesn\'t allow access to non-admin users', (done) => {
    done();
  });
});
