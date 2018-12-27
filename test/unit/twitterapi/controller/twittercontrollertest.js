var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var sinon = require('sinon');
var twittercontroller = require('../../../../src/twitterapi/controllers/twittercontroller')
var chaiHttp = require('chai-http');
var restify = require('restify');
var server;
var twitterservice;

chai.use(chaiHttp);
chai.use(chaiAsPromised);
describe('Twitter Controller API Tests', () => {
    beforeEach((done) => {
        server = restify.createServer();
        server.listen(8080, () => {
            done();
        });
        twitterservice = new Object();
    });
    xit('Should call the twitter service for getting the tweets based on the search criteria', (done) => {
        var Twittercontroller = new twittercontroller(twitterservice);
        twitterservice.searchForTweets = sinon.stub().resolves({
            id: '1000',
            text: 'gold',
            name: 'vaibhavgoswamißßßßßßß'
        });
        Twittercontroller.registerroutes(server);
        chai.request('http://localhost:3000')
            .get('/search/twitter?query=india')
            .end((err, res) => {
                should.equal(err, null);
                res.status.should.equal(200);
                res.should.be.json;
                done();
            });
        done();
    });

    afterEach((done) => {
        server.close(() => {
            done();
        });
    });

});