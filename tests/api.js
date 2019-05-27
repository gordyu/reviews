var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var assert = require('assert');

const app = require('../server/index'); 

// Return a JSON object back from the response
// Handles both `res.send(JSON.stringify({}))` and `res.json({})`
var getBody = function (res) {
  return JSON.parse(res.text);
};


describe('Reviews api test suite', function () {
    
  describe('GET all reviews', function () {
    describe('GET', function () {
      it('responds with a 200 (OK)', function (done) {
        request(app)
          .get('/reviews')
          .expect(200, done);
      });
    });
  });   

});  