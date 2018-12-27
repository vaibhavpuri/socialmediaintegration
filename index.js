'use strict'
var restify = require('restify');
const twitter = require('twitter');
const twitterservice = require('./src/twitterapi/services/twitterservice');
const twitterrepository = require('./src/twitterapi/repository/twitterRepository');
const twittercontroller = require('./src/twitterapi/controllers/twittercontroller')
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/twitter');


const twit = new twitter({
    consumer_key: 'yLjIjH7kziXU0QhNqumcqmTCI',
    consumer_secret: 'ilK3CIS6EpwJokZXbiBnDUqbs7q2M73yp8mF8uTY2fbfYUYjCu',
    access_token_key: '1075674534861258752-vI6bzV8Pmm0EQ22jGMxROOjhfJqqt1',
    access_token_secret: 'St9qOzzw70Qv51HTOL8IOPaoiBBUNmut5wClkss9rMpB4'
});
var serverStatus = {
    started: false
};


const server = restify.createServer({
    name: 'socialmediaintegration',
    version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
const tweetdateschema = new mongoose.Schema({
    id: Number,
    tweetDate: Date,
    q: { type: [String], index: true }
});
const tweetschema = new mongoose.Schema({
    tweetDate: Date,
    q: { type: [String], index: true }
});
const twitterdatemodel = mongoose.model('TweetDates', tweetdateschema);
const tweetsModel = mongoose.model('tweets', tweetschema);
const twitterRepository = new twitterrepository(twitterdatemodel, tweetsModel);
const twitterService = new twitterservice(twit, twitterRepository);
const twitterController = new twittercontroller(twitterService);
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);

twitterController.registerroutes(server);

server.listen(3000, function () {
    console.log('%s listening at %s', server.name, server.url);
    serverStatus.started = true;
});

module.exports.serverStatus = serverStatus;
module.exports.server = server; // for testing