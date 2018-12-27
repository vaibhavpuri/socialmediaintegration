'use strict'
const app = require('../../../index').server;
const chaihttp = require('chai-http');
const chai = require('chai');
chai.use(chaihttp);
chai.should();
describe('Twitter API Integration Test', () => {
    beforeEach((done) => {
        console.log('START THE BEAT!!!');
        done();
    });
    it('should search for the passed parameter ', (done) => {
        chai.request(app)
        .get('/search/twitter?query=tumbbad')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('text');
            done();
        });
    });
    afterEach((done) => {
        done();
    });
});